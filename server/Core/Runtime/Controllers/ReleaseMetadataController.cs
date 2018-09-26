using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.MetadataModels;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.Implementations.EfCore.CodeGenerator;
using Brainvest.Dscribe.Metadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class ReleaseMetadataController : ControllerBase
	{

		private readonly IHostingEnvironment _hostingEnvironment;
		private readonly MetadataDbContext _dbContext;
		private readonly IBusinessCodeGenerator _codeGenerator;
		private readonly IBusinessCompiler _compiler;
		private readonly IImplementationsContainer _implementationContainer;
		private readonly IGlobalConfiguration _globalConfiguration;
		private readonly IPermissionService _permissionService;

		public ReleaseMetadataController(
			IHostingEnvironment hostingEnvironment,
			MetadataDbContext dbContext,
			IBusinessCodeGenerator codeGenerator,
			IBusinessCompiler compiler,
			IImplementationsContainer implementationContainer,
			IOptions<GlobalConfiguration> globalConfiguration,
			IPermissionService permissionService
			)
		{
			_hostingEnvironment = hostingEnvironment;
			_dbContext = dbContext;
			_codeGenerator = codeGenerator;
			_compiler = compiler;
			_implementationContainer = implementationContainer;
			_globalConfiguration = globalConfiguration.Value;
			_permissionService = permissionService;
		}

		[HttpPost]
		public async Task<ActionResult> ReleaseMetadata(ReleaseMetadataRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationContainer, null, ActionTypeEnum.ManageMetadata)))
			{
				return Unauthorized();
			}
			var appInstance = await _dbContext.AppInstances.SingleAsync(X => X.Id == request.AppInstanceId);
			var appType = await _dbContext.AppTypes.SingleAsync(x => x.Id == appInstance.AppTypeId);

			var bundle = await MetadataBundle.FromDbWithoutNavigations(_dbContext, appType.Id, appInstance.Id);
			var json = JsonConvert.SerializeObject(bundle);
			var zipped = TextHelper.Zip(json);

			var release = new MetadataRelease
			{
				AppTypeId = appType.Id,
				CreatedByUserId = 0, //Todo: How to get this value?
				ReleaseTime = DateTime.UtcNow,
				MetadataSnapshotText = json,
				Version = request.Version,
				VersionCode = request.VersionCode
			};
			await _dbContext.MetadataReleases.AddAsync(release);
			if (request.SetAsInstanceMetadata)
			{
				appInstance.MetadataRelease = release;
			}
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult<MetadataValidationResponse>> GenerateCode()
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationContainer, null, ActionTypeEnum.ManageMetadata)))
			{
				return Unauthorized();
			}
			var bundle = await MetadataBundle.FromDbWithoutNavigations(_dbContext
				, _implementationContainer.InstanceInfo.AppTypeId, _implementationContainer.InstanceInfo.AppInstanceId);
			bundle.FixupRelationships();
			var metadataCache = new MetadataCache(bundle);
			var errorList = await GenerateCodeValidation();
			var result = new MetadataValidationResponse();
			if (errorList.Value?.Success != true)
			{
				return errorList;
			}

			var compileUnit = (_codeGenerator as EfCoreCodeGenerator).CreateCode(metadataCache, _implementationContainer.InstanceInfo);
			var compositionDirectory = Path.Combine(_globalConfiguration.ImplementationsDirectory, _implementationContainer.InstanceInfo.InstanceName);
			EnsurePath(compositionDirectory);
			var sourceCodeFilePath = Path.Combine(compositionDirectory, "source.cs");
			(_codeGenerator as EfCoreCodeGenerator).GenerateSourceCode(compileUnit, sourceCodeFilePath);
			var assembliesPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location); //TODO: This is hardcoded
			var (succeeded, diagnostics) = await (_compiler as EfCoreCompiler).GenerateAssembly(sourceCodeFilePath, Path.Combine(
				compositionDirectory, _implementationContainer.InstanceInfo.InstanceName + ".dll")
				, assembliesPath);
			if (!succeeded)
			{
				result.Errors.AddRange(diagnostics.Select(x => x.GetMessage()));
				result.Success = false;
				return result;
			}
			result.Success = true;
			return result;
		}

		private void EnsurePath(string pluginsDirectory)
		{
			if (Directory.GetDirectoryRoot(pluginsDirectory).Equals(pluginsDirectory, StringComparison.InvariantCultureIgnoreCase))
			{
				return;
			}
			EnsurePath(Directory.GetParent(pluginsDirectory).FullName);
			if (!Directory.Exists(pluginsDirectory))
			{
				Directory.CreateDirectory(pluginsDirectory);
			}
		}

		public async Task<ActionResult<MetadataValidationResponse>> GenerateCodeValidation()
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationContainer, null, ActionTypeEnum.ManageMetadata)))
			{
				return Unauthorized();
			}
			//var errors = new List<string>();
			var errors = new MetadataValidationResponse();
			var duplicateTypes = await _dbContext.Entities.Where(x => x.AppTypeId == _implementationContainer.InstanceInfo.AppTypeId)
				.GroupBy(x => x.Name).Where(g => g.Count() > 1).ToListAsync();
			if (duplicateTypes.Count() > 0)
				errors.Errors.AddRange(duplicateTypes.Select(g => $"Entity {g.Key} has repeated more than once"));

			var entities = await _dbContext.Entities.Where(x => x.AppTypeId == _implementationContainer.InstanceInfo.AppTypeId).ToListAsync();
			foreach (var entity in entities)
			{
				var properties = await _dbContext.Properties.Where(x => x.EntityId == entity.Id).ToListAsync();

				var duplicateProperties = properties.GroupBy(x => x.Name).Where(g => g.Count() > 1).ToList();
				if (duplicateProperties.Count() > 0)
					errors.Errors.AddRange(duplicateProperties.Select(g => $"Properties { g.Key } of entity {entity.Name} has repeated more than once"));


				var noPrimaryKey = !properties.Any(x => x.GeneralUsageCategoryId == 2);
				if (noPrimaryKey)
					errors.Warnings.Add($"There is no primary key in the entity {entity.Name}");
				else
				{
					var primaryKeyDuplicate = properties.Where(x => x.GeneralUsageCategoryId == 2)
													.GroupBy(g => g.GeneralUsageCategoryId)
													.Where(x => x.Count() > 1).ToList();
					if (primaryKeyDuplicate.Count() > 0)
						errors.Errors.Add($"Primary key has repeated more than once in entity { entity.Name }");
					else
					{
						var primaryKeyNullable = properties.Where(x => x.GeneralUsageCategoryId == 2 && x.IsNullable).ToList();
						if (primaryKeyNullable.Count() > 0)
							errors.Errors.Add($"Primary key can't be nullable type {entity.Name}");
					}
				}

				if (properties.Where(x => x.DataTypeId == DataTypeEnum.ForeignKey).FirstOrDefault() != null)
				{
					string propertyName = properties.Where(x => x.DataTypeId == DataTypeEnum.ForeignKey).FirstOrDefault().Name;
					var propertyLastDigits = propertyName.Substring(propertyName.Length - 2);
					if (propertyLastDigits != "Id")
						errors.Warnings.Add($"Foreign key should end with Id keyword in entity {entity.Name}");
				}

			}
			if (errors.Warnings.Count > 0 || errors.Errors.Count() > 0)
				errors.Success = false;
			return errors;
		}
	}
}
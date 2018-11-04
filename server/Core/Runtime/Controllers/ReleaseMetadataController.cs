using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.MetadataModels;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.Metadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Linq;
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
		private readonly IBusinessAssemblyGenerator _assemblyGenerator;
		private readonly IImplementationsContainer _implementationContainer;
		private readonly IGlobalConfiguration _globalConfiguration;
		private readonly IPermissionService _permissionService;

		public ReleaseMetadataController(
			IHostingEnvironment hostingEnvironment,
			MetadataDbContext dbContext,
			IBusinessAssemblyGenerator assemblyGenerator,
			IImplementationsContainer implementationContainer,
			IOptions<GlobalConfiguration> globalConfiguration,
			IPermissionService permissionService
			)
		{
			_hostingEnvironment = hostingEnvironment;
			_dbContext = dbContext;
			_assemblyGenerator = assemblyGenerator;
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

			var (succeeded, diagnostics) = await _assemblyGenerator.GenerateAssembly(metadataCache, _implementationContainer.InstanceInfo
				, _globalConfiguration.ImplementationsDirectory, _implementationContainer.InstanceInfo.InstanceName);

			if (!succeeded)
			{
				result.Errors.AddRange(diagnostics.Select(x => x.Message));
				result.Success = false;
				return result;
			}
			result.Success = true;
			return result;
		}

		public async Task<ActionResult<MetadataValidationResponse>> GenerateCodeValidation()
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationContainer, null, ActionTypeEnum.ManageMetadata)))
			{
				return Unauthorized();
			}
			//var errors = new List<string>();
			var errors = new MetadataValidationResponse();
			var duplicateTypes = await _dbContext.EntityTypes.Where(x => x.AppTypeId == _implementationContainer.InstanceInfo.AppTypeId)
				.GroupBy(x => x.Name).Where(g => g.Count() > 1).ToListAsync();
			if (duplicateTypes.Count() > 0)
				errors.Errors.AddRange(duplicateTypes.Select(g => $"Entity {g.Key} has repeated more than once"));

			var entityTypes = await _dbContext.EntityTypes.Where(x => x.AppTypeId == _implementationContainer.InstanceInfo.AppTypeId).ToListAsync();
			foreach (var entityType in entityTypes)
			{
				var properties = await _dbContext.Properties.Where(x => x.OwnerEntityTypeId == entityType.Id).ToListAsync();

				var duplicateProperties = properties.GroupBy(x => x.Name).Where(g => g.Count() > 1).ToList();
				if (duplicateProperties.Count() > 0)
					errors.Errors.AddRange(duplicateProperties.Select(g => $"Properties { g.Key } of entity {entityType.Name} has repeated more than once"));


				var noPrimaryKey = !properties.Any(x => x.GeneralUsageCategoryId == 2);
				if (noPrimaryKey)
					errors.Warnings.Add($"There is no primary key in the entity {entityType.Name}");
				else
				{
					var primaryKeyDuplicate = properties.Where(x => x.GeneralUsageCategoryId == 2)
													.GroupBy(g => g.GeneralUsageCategoryId)
													.Where(x => x.Count() > 1).ToList();
					if (primaryKeyDuplicate.Count() > 0)
						errors.Errors.Add($"Primary key has repeated more than once in entity { entityType.Name }");
					else
					{
						var primaryKeyNullable = properties.Where(x => x.GeneralUsageCategoryId == 2 && x.IsNullable).ToList();
						if (primaryKeyNullable.Count() > 0)
							errors.Errors.Add($"Primary key can't be nullable type {entityType.Name}");
					}
				}

				if (properties.Where(x => x.DataTypeId == DataTypeEnum.ForeignKey).FirstOrDefault() != null)
				{
					string propertyName = properties.Where(x => x.DataTypeId == DataTypeEnum.ForeignKey).FirstOrDefault().Name;
					var propertyLastDigits = propertyName.Substring(propertyName.Length - 2);
					if (propertyLastDigits != "Id")
						errors.Warnings.Add($"Foreign key should end with Id keyword in entity {entityType.Name}");
				}

			}
			if (errors.Errors.Count() > 0)
			{
				errors.Success = false;
			}
			return errors;
		}
	}
}
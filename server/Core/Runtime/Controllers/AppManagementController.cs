using Brainvest.Dscribe.Abstractions.Models.AppManagement;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Brainvest.Dscribe.Runtime.Validations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.Controllers
{
	[ApiController]
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	public class AppManagementController : ControllerBase
	{
		MetadataDbContext _dbContext;

		public AppManagementController(
			MetadataDbContext dbContext
			)
		{
			_dbContext = dbContext;
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<AppInstanceInfoModel>>> GetAppInstancesInfoForHome()
		{
			return await _dbContext.AppInstances.Select(x =>
			new AppInstanceInfoModel
			{
				Id = x.Id,
				AppTypeId = x.AppTypeId,
				AppTypeName = x.AppType.Name,
				AppTypeTitle = x.AppType.Title,
				IsEnabled = x.IsEnabled,
				IsProduction = x.IsProduction,
				MetadataReleaseReleaseTime = x.MetadataRelease.ReleaseTime,
				MetadataReleaseVersion = x.MetadataRelease.Version,
				MetadataReleaseVersionCode = x.MetadataRelease.VersionCode,
				Name = x.Name,
				GeneratedCodeNamespace = x.GeneratedCodeNamespace,
				Title = x.Title,
				UseUnreleasedMetadata = x.UseUnreleasedMetadata,
			}).ToListAsync();
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<AppInstanceInfoModel>>> GetAppInstancesInfo()
		{
			return await _dbContext.AppInstances.Select(x =>
			new AppInstanceInfoModel
			{
				Id = x.Id,
				AppTypeId = x.AppTypeId,
				AppTypeName = x.AppType.Name,
				AppTypeTitle = x.AppType.Title,
				IsEnabled = x.IsEnabled,
				IsProduction = x.IsProduction,
				MetadataReleaseReleaseTime = x.MetadataRelease.ReleaseTime,
				MetadataReleaseVersion = x.MetadataRelease.Version,
				MetadataReleaseVersionCode = x.MetadataRelease.VersionCode,
				Name = x.Name,
				GeneratedCodeNamespace = x.GeneratedCodeNamespace,
				Title = x.Title,
				UseUnreleasedMetadata = x.UseUnreleasedMetadata,
				DatabaseProviderId = x.DatabaseProviderId,
				DataConnectionString = DeserializeConnectionString(x.DataConnectionString)
			}).ToListAsync();
		}

		[HttpPost]
		public async Task<ActionResult> AddAppInstance(AppInstanceInfoModel model)
		{
			var validationMessage = await AppManagementValidationLogic.AddAppInstanceValidation(model, _dbContext);
			if (!string.IsNullOrEmpty(validationMessage))
			{
				return StatusCode(400, validationMessage);
			}
			_dbContext.AppInstances.Add(new AppInstance
			{
				AppTypeId = model.AppTypeId,
				DatabaseProviderId = model.DatabaseProviderId,
				GeneratedCodeNamespace = model.GeneratedCodeNamespace,
				IsEnabled = model.IsEnabled,
				IsProduction = model.IsProduction,
				Name = model.Name,
				Title = model.Title,
				DataConnectionString = GenerateConnectionString(model.DataConnectionString),
				MetadataReleaseId = model.MetadataReleaseId,

			});
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> EditAppInstance(AppInstanceInfoModel model)
		{
			var validationMessage = await AppManagementValidationLogic.EditAppInstanceValidation(model, _dbContext);
			if (!string.IsNullOrEmpty(validationMessage))
			{
				return StatusCode(400, validationMessage);
			}

			var appInstance = await _dbContext.AppInstances.FindAsync(model.Id);

			appInstance.AppTypeId = model.AppTypeId;
			appInstance.DatabaseProviderId = model.DatabaseProviderId;
			appInstance.GeneratedCodeNamespace = model.GeneratedCodeNamespace;
			appInstance.IsEnabled = model.IsEnabled;
			appInstance.IsProduction = model.IsProduction;
			appInstance.Name = model.Name;
			appInstance.Title = model.Title;
			appInstance.DataConnectionString = GenerateConnectionString(model.DataConnectionString);
			appInstance.MetadataReleaseId = model.MetadataReleaseId;
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> DeleteAppInstance(AppInstanceInfoModel model)
		{
			var validationMessage = await AppManagementValidationLogic.DeleteAppInstanceValidation(model, _dbContext);
			if (!string.IsNullOrEmpty(validationMessage))
			{
				return StatusCode(400, validationMessage);
			}
			var appInstance = await _dbContext.AppInstances.FindAsync(model.Id);
			_dbContext.AppInstances.Remove(appInstance);
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<AppTypeModel>>> GetAppTypes()
		{
			return await _dbContext.AppTypes.Select(x =>
			new AppTypeModel
			{
				Id = x.Id,
				Name = x.Name,
				Title = x.Title
			}).ToListAsync();
		}

		[HttpPost]
		public async Task<ActionResult> AddAppType(AppTypeModel model)
		{
			var validationMessage = await AppManagementValidationLogic.AddAppTypeValidation(model, _dbContext);
			if (!string.IsNullOrEmpty(validationMessage))
			{
				return StatusCode(400, validationMessage);
			}
			_dbContext.AppTypes.Add(new AppType
			{
				Title = model.Title,
				Name = model.Name,
				Id = model.Id
			});
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> EditAppType(AppTypeModel model)
		{
			var validationMessage = await AppManagementValidationLogic.EditAppTypeValidation(model, _dbContext);
			if (!string.IsNullOrEmpty(validationMessage))
			{
				return StatusCode(400, validationMessage);
			}
			var appType = await _dbContext.AppTypes.FindAsync(model.Id);

			appType.Name = model.Name;
			appType.Title = model.Title;

			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> DeleteAppType(AppTypeModel model)
		{
			var validationMessage = await AppManagementValidationLogic.DeleteAppTypeValidation(model, _dbContext);
			if (!string.IsNullOrEmpty(validationMessage))
			{
				return StatusCode(400, validationMessage);
			}
			var appType = await _dbContext.AppTypes.FindAsync(model.Id);
			_dbContext.AppTypes.Remove(appType);
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpGet]
		public async Task<IEnumerable<DatabaseProvider>> GetDatabaseProviders()
		{
			return await _dbContext.DatabaseProviders
				.Select(x => new DatabaseProvider
				{
					Id = x.Id,
					Name = x.Name
				}).ToListAsync();
		}
		public string GenerateConnectionString(DataConnectionStringModel model)
		{
			var result = "Server=" + model.Server + ";" +
   						 "Database=" + model.Database + ";" +
   						 "Trusted_Connection=" + model.Trusted_Connection + ";" +
   						 "MultipleActiveResultSets=" + model.MultipleActiveResultSets + ";" +
   						 "user=" + model.User + ";" +
   						 "password=" + model.Password;

			return result;
		}

		public DataConnectionStringModel DeserializeConnectionString(string connectionString)
		{
			var result = new DataConnectionStringModel();
			Match server = Regex.Match(connectionString, @"server=([^;]*)", RegexOptions.IgnoreCase);
			Match Database = Regex.Match(connectionString, @"Database=([^;]*)", RegexOptions.IgnoreCase);
			Match Trusted_Connection = Regex.Match(connectionString, @"Trusted_Connection=([^;]*)", RegexOptions.IgnoreCase);
			Match MultipleActiveResultSets = Regex.Match(connectionString, @"MultipleActiveResultSets=([^;]*)", RegexOptions.IgnoreCase);
			Match user = Regex.Match(connectionString, @"user=([^;]*)", RegexOptions.IgnoreCase);
			Match password = Regex.Match(connectionString, @"password=([^;]*)", RegexOptions.IgnoreCase);

			result.Server = server.Success ? server.Groups[1].Value : null;
			result.Database = Database.Success ? Database.Groups[1].Value : null;
			result.Trusted_Connection = Trusted_Connection.Success ? bool.Parse(Trusted_Connection.Groups[1].Value) : false;
			result.MultipleActiveResultSets = MultipleActiveResultSets.Success ? bool.Parse(MultipleActiveResultSets.Groups[1].Value) : false;
			result.MultipleActiveResultSets = MultipleActiveResultSets.Success ? bool.Parse(MultipleActiveResultSets.Groups[1].Value) : false;
			result.User = user.Success ? user.Groups[1].Value : null;
			result.Password = password.Success ? password.Groups[1].Value : null;

			return result;
		}
	}
}
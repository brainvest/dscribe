using Brainvest.Dscribe.Abstractions.Models;
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
			return await _dbContext.AppInstances
				.OrderBy(x => x.SortOrder).ThenBy(x => x.Name).Select(x =>
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
				DbContextName = x.DbContextName,
				Title = x.Title,
				UseUnreleasedMetadata = x.UseUnreleasedMetadata,
				SortOrder = x.SortOrder,
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
				DbContextName = x.DbContextName,
				Title = x.Title,
				UseUnreleasedMetadata = x.UseUnreleasedMetadata,
				DatabaseProviderId = x.DatabaseProviderId,
				DataConnectionStringTemplateName = x.DataConnectionStringTemplateName,
				LobConnectionStringTemplateName = x.LobConnectionStringTemplateName,
				MainDatabaseName = x.MainDatabaseName,
				LobDatabaseName = x.LobDatabaseName,
                MigrateDatabase = x.MigrateDatabase,
                MetadataReleaseId = x.MetadataReleaseId,
				SortOrder = x.SortOrder,
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
			var appInstance = new AppInstance
			{
				AppTypeId = model.AppTypeId,
				DatabaseProviderId = model.DatabaseProviderId,
				GeneratedCodeNamespace = model.GeneratedCodeNamespace,
				DbContextName = model.DbContextName,
				IsEnabled = model.IsEnabled,
				IsProduction = model.IsProduction,
				Name = model.Name,
				Title = model.Title,
				DataConnectionStringTemplateName = model.DataConnectionStringTemplateName,
				LobConnectionStringTemplateName = model.LobConnectionStringTemplateName,
				MainDatabaseName = model.MainDatabaseName,
				LobDatabaseName = model.LobDatabaseName,
				MetadataReleaseId = model.MetadataReleaseId,
                MigrateDatabase = model.MigrateDatabase,
                UseUnreleasedMetadata = model.UseUnreleasedMetadata,
				SortOrder = model.SortOrder,
			};
			_dbContext.AppInstances.Add(appInstance);
			await _dbContext.SaveChangesAsync();
			((RequestLogModel)HttpContext.Items["RequestLog"]).AppInstanceId = appInstance.Id;
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
			appInstance.DbContextName = model.DbContextName;
			appInstance.IsEnabled = model.IsEnabled;
			appInstance.IsProduction = model.IsProduction;
			appInstance.Name = model.Name;
			appInstance.Title = model.Title;
			appInstance.DataConnectionStringTemplateName = model.DataConnectionStringTemplateName;
			appInstance.LobConnectionStringTemplateName = model.LobConnectionStringTemplateName;
			appInstance.MainDatabaseName = model.MainDatabaseName;
			appInstance.LobDatabaseName = model.LobDatabaseName;
			appInstance.MetadataReleaseId = model.MetadataReleaseId;
            appInstance.UseUnreleasedMetadata = model.UseUnreleasedMetadata;
			appInstance.SortOrder = model.SortOrder;
			await _dbContext.SaveChangesAsync();
			((RequestLogModel)HttpContext.Items["RequestLog"]).AppInstanceId = appInstance.Id;
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
			((RequestLogModel)HttpContext.Items["RequestLog"]).AppInstanceId = appInstance.Id;
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
			var appType = new AppType
			{
				Title = model.Title,
				Name = model.Name,
				Id = model.Id
			};
			_dbContext.AppTypes.Add(appType);
			await _dbContext.SaveChangesAsync();
			((RequestLogModel)HttpContext.Items["RequestLog"]).AppTypeId = appType.Id;
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
			((RequestLogModel)HttpContext.Items["RequestLog"]).AppTypeId = appType.Id;
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
			((RequestLogModel)HttpContext.Items["RequestLog"]).AppTypeId = appType.Id;
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
	}
}
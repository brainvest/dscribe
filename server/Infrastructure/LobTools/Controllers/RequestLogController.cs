using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.Models;
using Brainvest.Dscribe.LobTools.Models.History;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.LobTools.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class RequestLogController : ControllerBase
	{
		public LobToolsDbContext _dbContext;

		public RequestLogController(LobToolsDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<IEnumerable<EntityTypeHistoryModel>> GetEntityTypeHistory(EntityTypeHistoryModel model)
		{
			var logs = await _dbContext.RequestLogs.Where(x => x.EntityTypeId == model.Id && x.Failed == false).OrderByDescending(x => x.Id).ToListAsync();

			var result = logs.Select(x => new EntityTypeHistoryModel
			{
				BaseEntityTypeId = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).BaseEntityTypeId,
				CodePath = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).CodePath,
				DisplayNamePath = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).DisplayNamePath,
				EntityTypeGeneralUsageCategoryId = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).EntityTypeGeneralUsageCategoryId,
				Id = (int)x.EntityTypeId,
				LogId = x.Id,
				Name = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).Name,
				PluralTitle = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).PluralTitle,
				ProcessDuration = x.ProcessDuration,
				SchemaName = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).SchemaName,
				SingularTitle = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).SingularTitle,
				StartTime = x.StartTime,
				TableName = JsonConvert.DeserializeObject<EntityTypeHistoryModel>(x.Body).TableName,
				UserId = x.UserId,
				//Properties = logs.Where(y => y.EntityTypeId == x.EntityTypeId).OrderByDescending(y => y.Id).Select(y => new PropertyModel
				//{

				//}).ToList()
			}).ToList();
			return result;
		}

		public async Task<IEnumerable<PropertyHistoryModel>> GetPropertyHistory(PropertyHistoryModel model)
		{
			var logs = await _dbContext.RequestLogs.Where(x => x.PropertyId == model.Id && x.Failed == false).OrderByDescending(x => x.Id).ToListAsync();
			var result = logs.Select(x => new PropertyHistoryModel
			{
				Id = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).Id,
				DataEntityTypeId = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).DataEntityTypeId,
				DataTypeId = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).DataTypeId,
				ForeignKeyPropertyId = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).ForeignKeyPropertyId,
				InversePropertyId = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).InversePropertyId,
				IsNullable = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).IsNullable,
				LogId = x.Id,
				Name = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).Name,
				OwnerEntityTypeId = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).OwnerEntityTypeId,
				ProcessDuration = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).ProcessDuration,
				PropertyGeneralUsageCategoryId = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).PropertyGeneralUsageCategoryId,
				StartTime = x.StartTime,
				Title = JsonConvert.DeserializeObject<PropertyHistoryModel>(x.Body).Title,
				UserId = x.UserId
			}).ToList();
			return result;
		}

		public async Task<IEnumerable<AppInstanceHistoryModel>> GetAppInstanceHistory(AppInstanceHistoryModel model)
		{
			var logs = await _dbContext.RequestLogs.Where(x => x.AppInstanceId == model.Id && x.Failed == false).OrderByDescending(x => x.Id).ToListAsync();
			var result = logs.Select(x => new AppInstanceHistoryModel
			{
				UseUnreleasedMetadata = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).UseUnreleasedMetadata,
				UserId = x.UserId,
				StartTime = x.StartTime,
				ProcessDuration = x.ProcessDuration,
				AppTypeId = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).AppTypeId,
				AppTypeName = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).AppTypeName,
				Title = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).Title,
				AppTypeTitle = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).AppTypeTitle,
				DatabaseProviderId = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).DatabaseProviderId,
				DataConnectionString = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).DataConnectionString,
				GeneratedCodeNamespace = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).GeneratedCodeNamespace,
				Id = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).Id,
				IsEnabled = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).IsEnabled,
				IsProduction = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).IsProduction,
				LogId = x.Id,
				MetadataReleaseId = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).MetadataReleaseId,
				MetadataReleaseReleaseTime = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).MetadataReleaseReleaseTime,
				MetadataReleaseVersion = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).MetadataReleaseVersion,
				MetadataReleaseVersionCode = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).MetadataReleaseVersionCode,
				Name = JsonConvert.DeserializeObject<AppInstanceHistoryModel>(x.Body).Name,
			}).ToList();
			return result;
		}

		public async Task<IEnumerable<AppTypeHistoryModel>> GetAppTypeHistory(AppTypeHistoryModel model)
		{
			var logs = await _dbContext.RequestLogs.Where(x => x.AppTypeId == model.Id && x.Failed == false).OrderByDescending(x => x.Id).ToListAsync();
			var result = logs.Select(x => new AppTypeHistoryModel
			{
				Name = JsonConvert.DeserializeObject<AppTypeHistoryModel>(x.Body).Name,
				Id = JsonConvert.DeserializeObject<AppTypeHistoryModel>(x.Body).Id,
				Title = JsonConvert.DeserializeObject<AppTypeHistoryModel>(x.Body).Title,
				LogId = x.Id,
				ProcessDuration = x.ProcessDuration,
				StartTime = x.StartTime,
				UserId = x.UserId
			}).ToList();
			return result;
		}
	}
}

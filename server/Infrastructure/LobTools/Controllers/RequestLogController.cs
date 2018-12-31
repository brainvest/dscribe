using Brainvest.Dscribe.Abstractions.Models.AppManagement;
using Brainvest.Dscribe.Abstractions.Models.ManageMetadata;
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
			var logs = await _dbContext.RequestLogs.Where(x => x.EntityTypeId == model.EntityType.Id && x.Failed == false).OrderByDescending(x => x.Id).ToListAsync();

			var result = logs.Select(x => new EntityTypeHistoryModel
			{
				EntityType = JsonConvert.DeserializeObject<EntityTypeModel>(x.Body),
				LogId = x.Id,
				ProcessDuration = x.ProcessDuration,
				StartTime = x.StartTime,
				UserId = x.UserId,
			}).ToList();
			return result;
		}

		public async Task<IEnumerable<PropertyHistoryModel>> GetPropertyHistory(PropertyHistoryModel model)
		{
			var logs = await _dbContext.RequestLogs.Where(x => x.PropertyId == model.Property.Id && x.Failed == false).OrderByDescending(x => x.Id).ToListAsync();
			var result = logs.Select(x => new PropertyHistoryModel
			{
				Property = JsonConvert.DeserializeObject<PropertyModel>(x.Body),
				LogId = x.Id,
				StartTime = x.StartTime,
				UserId = x.UserId
			}).ToList();
			return result;
		}

		public async Task<IEnumerable<AppInstanceHistoryModel>> GetAppInstanceHistory(AppInstanceHistoryModel model)
		{
			var logs = await _dbContext.RequestLogs.Where(x => x.AppInstanceId == model.AppInstance.Id && x.Failed == false).OrderByDescending(x => x.Id).ToListAsync();
			var result = logs.Select(x => new AppInstanceHistoryModel
			{
				AppInstance = JsonConvert.DeserializeObject<AppInstanceInfoModel>(x.Body),
				UserId = x.UserId,
				StartTime = x.StartTime,
				ProcessDuration = x.ProcessDuration,
				LogId = x.Id,
			}).ToList();
			return result;
		}

		public async Task<IEnumerable<AppTypeHistoryModel>> GetAppTypeHistory(AppTypeHistoryModel model)
		{
			var logs = await _dbContext.RequestLogs.Where(x => x.AppTypeId == model.AppType.Id && x.Failed == false).OrderByDescending(x => x.Id).ToListAsync();
			var result = logs.Select(x => new AppTypeHistoryModel
			{
				AppType = JsonConvert.DeserializeObject<AppTypeModel>(x.Body),
				LogId = x.Id,
				ProcessDuration = x.ProcessDuration,
				StartTime = x.StartTime,
				UserId = x.UserId
			}).ToList();
			return result;
		}
	}
}

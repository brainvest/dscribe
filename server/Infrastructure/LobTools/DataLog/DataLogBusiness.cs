using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.LobTools.DataLog
{
	public class DataLogBusiness : IDataLogImplementation
	{
		private readonly LobToolsDbContext _lobToolsDbContext;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public DataLogBusiness(LobToolsDbContext lobToolsDbContext, IHttpContextAccessor httpContextAccessor)
		{
			_lobToolsDbContext = lobToolsDbContext;
			_httpContextAccessor = httpContextAccessor;
		}
		public async Task SaveDataChanges(object businessRepository)
		{
			var dataChanges = (businessRepository as DbContext).ChangeTracker
				.Entries()
				.Where(x => x.State == EntityState.Modified)
				.Select(x => new
				{
					Entity = x.Entity,
					Action = x.State
				})
				.ToList();
			foreach (var dataChange in dataChanges)
			{
				var data = new Entities.DataLog
				{
					Body = JsonConvert.SerializeObject(dataChange.Entity),
					DataRequestAction = (DataRequestAction)dataChange.Action,
					RequestLogId = ((RequestLogModel)_httpContextAccessor.HttpContext.Items["RequestLog"]).Id
				};
				_lobToolsDbContext.DataLogs.Add(data);
			}
			await _lobToolsDbContext.SaveChangesAsync();
		}
	}
}

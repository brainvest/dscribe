using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.LobTools.DataRequestLog;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.RequestLog;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MiddleWare.DataLog
{
	public class DataLoggerMiddleware
	{
		private readonly RequestDelegate _next;

		public DataLoggerMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public async Task Invoke(HttpContext httpContext, LobToolsDbContext dbContext, DataRequestLogger dataLogger)
		{
			var request = new Brainvest.Dscribe.LobTools.Entities.DataLog();
			try
			{
				request = await dataLogger.RequestIndiactor(httpContext);
				await _next(httpContext);
				await dataLogger.ResponseIndiactor(httpContext, request);
			}
			catch 
			{
				// WHAT TO DO IN HERE ? 
			}
		}
	}
}

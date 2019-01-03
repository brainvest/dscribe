using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.RequestLog;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MiddleWare.Log
{
	public class LoggerMiddleware
	{
		private readonly RequestDelegate _next;
		public static List<string> statusErrors;

		public LoggerMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public async Task Invoke(HttpContext httpContext, LobToolsDbContext dbContext, RequestLogger requestLogger)
		{
			var log = new RequestLogModel();
			try
			{
				log = await requestLogger.RequestIndiactor(httpContext);
				using (var memStream = new MemoryStream())
				{
					var originalResponseBody = httpContext.Response.Body;
					httpContext.Response.Body = memStream;

					httpContext.Items.Add("RequestLog", log);
					await _next(httpContext);

					memStream.Position = 0;
					log.Response = new StreamReader(memStream).ReadToEnd();
					memStream.Position = 0;
					await memStream.CopyToAsync(originalResponseBody);
					httpContext.Response.Body = originalResponseBody;

				}
				await requestLogger.ResponseIndiactor(httpContext, log);
			}
			catch (Exception ex)
			{
				await requestLogger.ExceptionIndiactor(httpContext, log, ex);
			}
		}
	}
}

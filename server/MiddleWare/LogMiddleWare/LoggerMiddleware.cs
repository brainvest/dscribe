using Brainvest.Dscribe.LobTools.Entities;
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

		public async Task Invoke(HttpContext httpContext, LobToolsDbContext dbContext)
		{
			var log = new RequestLog();
			try
			{
				log = await LogIndicator.RequestIndiactor(httpContext, dbContext);
				using (var memStream = new MemoryStream())
				{
					var originalResponseBody = httpContext.Response.Body;
					httpContext.Response.Body = memStream;

					await _next(httpContext);

					memStream.Position = 0;
					log.Response = new StreamReader(memStream).ReadToEnd();
					memStream.Position = 0;
					await memStream.CopyToAsync(originalResponseBody);
					httpContext.Response.Body = originalResponseBody;

				}
				await LogIndicator.ResponseIndiactor(httpContext, dbContext, log);
			}
			catch (Exception ex)
			{
				await LogIndicator.ExceptionIndiactor(httpContext, dbContext, log, ex);
			}
		}
	}
}

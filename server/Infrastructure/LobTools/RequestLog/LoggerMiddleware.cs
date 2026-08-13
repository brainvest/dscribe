namespace MiddleWare.Log;

using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.LobTools.RequestLog;
using Microsoft.AspNetCore.Http;

public class LoggerMiddleware(RequestDelegate next)
{
	private readonly RequestDelegate _next = next;
	public static List<string> statusErrors;

	public async Task Invoke(HttpContext httpContext, RequestLogger requestLogger)
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
			throw;
		}
	}
}

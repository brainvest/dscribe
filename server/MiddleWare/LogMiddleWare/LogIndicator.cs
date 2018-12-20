using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace MiddleWare.Log
{
	public static class LogIndicator
	{
		public static async Task<RequestLog> RequestIndiactor(HttpContext httpContext, LobToolsDbContext dbContext)
		{
			// TODO. ASK HOW TO FILL BELOW FIELDS
			// ActionTypeId - not now
			// EntityChanges - not now
			// QueryString - route parameter
			var request = new RequestLog
			{
				IpAddress = httpContext.Connection.RemoteIpAddress.ToString(),
				Path = httpContext.Request.Path,
				Method = httpContext.Request.Method,
				StartTime = DateTime.Now,
			};

			using (var reader = new StreamReader(httpContext.Request.Body, Encoding.UTF8, true, 1024, true))
			{
				request.Body = await reader.ReadToEndAsync();
				request.RequestSize = httpContext.Request.ContentLength;
			}

			dbContext.RequestLogs.Add(request);
			await dbContext.SaveChangesAsync();
			return request;
		}

		public static async Task ResponseIndiactor(HttpContext httpContext, LobToolsDbContext dbContext, RequestLog requestLog)
		{
			// TODO. ASK HOW TO FILL BELOW FIELDS
			// RESPONSE SIZE
			var request = await dbContext.RequestLogs.FindAsync(requestLog.Id);

			request.ResponseStatusCode = httpContext.Response.StatusCode;
			request.ProcessDuration = (DateTime.Now - request.StartTime).TotalMilliseconds.ToString();
			request.Failed = httpContext.Response.StatusCode == 200 ? false : true;
			await dbContext.SaveChangesAsync();
		}

		public static async Task ExceptionIndiactor(HttpContext httpContext, LobToolsDbContext dbContext, RequestLog requestLog,Exception ex)
		{
			var request = await dbContext.RequestLogs.FindAsync(requestLog.Id);

			request.ResponseStatusCode = httpContext.Response.StatusCode;
			request.ProcessDuration = (DateTime.Now - request.StartTime).TotalMilliseconds.ToString();
			request.ExceptionMessage = ex.GetFullMessage();
			request.ExceptionTitle = ex.Message;
			request.HadException = true;
			request.Failed = true;
			await dbContext.SaveChangesAsync();
		}
	}
}

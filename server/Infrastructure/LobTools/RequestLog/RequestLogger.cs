using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.AspNetCore.Http;
using MiddleWare.Log;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.LobTools.RequestLog
{
	public class RequestLogger : IRequestLogger
	{
		public LobToolsDbContext _dbContext;
		public RequestLogger(LobToolsDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<RequestLogModel> RequestIndiactor(HttpContext httpContext)
		{
			// TODO. ASK HOW TO FILL BELOW FIELDS
			// ActionTypeId - not now
			// EntityChanges - not now
			// QueryString - route parameter
			var request = new Entities.RequestLog
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
			_dbContext.RequestLogs.Add(request);
			await _dbContext.SaveChangesAsync();
			return new RequestLogModel { Id = request.Id };
		}
		public async Task ResponseIndiactor(HttpContext httpContext, RequestLogModel requestLog)
		{
			var request = await _dbContext.RequestLogs.FindAsync(requestLog.Id);
			request.ResponseStatusCode = httpContext.Response.StatusCode;
			request.ProcessDuration = (DateTime.Now - request.StartTime).TotalMilliseconds.ToString();
			request.ResponseSize = httpContext.Response.ContentLength;
			request.Failed = httpContext.Response.StatusCode == 200 ? false : true;
			await _dbContext.SaveChangesAsync();
		}
		public async Task ExceptionIndiactor(HttpContext httpContext, RequestLogModel requestLog, Exception ex)
		{
			var request = await _dbContext.RequestLogs.FindAsync(requestLog.Id);

			request.ResponseStatusCode = httpContext.Response.StatusCode;
			request.ProcessDuration = (DateTime.Now - request.StartTime).TotalMilliseconds.ToString();
			request.ExceptionMessage = ex.GetFullMessage();
			request.ExceptionTitle = ex.Message;
			request.HadException = true;
			request.Failed = true;
			await _dbContext.SaveChangesAsync();
		}
	}
}

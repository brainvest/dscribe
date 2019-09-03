using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Helpers;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MiddleWare.Log;
using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.LobTools.RequestLog
{
	public class RequestLogger : IRequestLogger, IDisposable
	{
		private IImplementationsContainer _implementationsContainer;
		private LobToolsDbContext _dbContext;
		private Stopwatch _stopwatch = new Stopwatch();
		private readonly ILogger<RequestLogger> _logger;

		public RequestLogger(IImplementationsContainer implementationsContainer, IHttpContextAccessor httpContextAccessor, ILogger<RequestLogger> logger)
		{
			_implementationsContainer = implementationsContainer;
			_dbContext = _implementationsContainer.GetLobDbContext<LobToolsDbContext>(httpContextAccessor.HttpContext);
			_logger = logger;
		}

		public async Task<RequestLogModel> RequestIndiactor(HttpContext httpContext)
		{
			// TODO. ASK HOW TO FILL BELOW FIELDS
			// ActionTypeId - not now
			// EntityChanges - not now
			// QueryString - route parameter
			_stopwatch.Start();
			var request = new Entities.RequestLog
			{
				IpAddress = httpContext.Connection.RemoteIpAddress.ToString(),
				Path = httpContext.Request.Path,
				Method = httpContext.Request.Method,
				StartTime = DateTime.Now,
			};

			var timer = Stopwatch.StartNew();
			if (httpContext.Request?.Body != null && !string.IsNullOrWhiteSpace(httpContext.Request.ContentType) &&
				!httpContext.Request.ContentType.StartsWith("multipart/form-data", StringComparison.InvariantCultureIgnoreCase))
			{
				#region Get Request Body
				request.Body = await new StreamReader(httpContext.Request.Body).ReadToEndAsync();
				var injectedRequestStream = new MemoryStream();
				var bytesToWrite = Encoding.UTF8.GetBytes(request.Body);
				injectedRequestStream.Write(bytesToWrite, 0, bytesToWrite.Length);
				injectedRequestStream.Seek(0, SeekOrigin.Begin);
				httpContext.Request.Body = injectedRequestStream;
				#endregion
			}

			request.RequestSize = httpContext.Request.ContentLength;

			_dbContext.RequestLogs.Add(request);
			await _dbContext.SaveChangesAsync();
			return new RequestLogModel
			{
				Id = request.Id,
				Body = request.Body,
				IpAddress = request.IpAddress,
				Method = request.Method,
				Path = request.Path,
				StartTime = request.StartTime,
				UserId = request.UserId,
			};
		}
		public async Task ResponseIndiactor(HttpContext httpContext, RequestLogModel requestLog)
		{
			var request = await _dbContext.RequestLogs.FindAsync(requestLog.Id);
			request.ResponseStatusCode = httpContext.Response.StatusCode;
			request.ResponseSize = httpContext.Response.ContentLength;
			request.Failed = httpContext.Response.StatusCode == 200 ? false : true;
			request.EntityTypeId = ((RequestLogModel)httpContext.Items["RequestLog"]).EntityTypeId;
			request.PropertyId = ((RequestLogModel)httpContext.Items["RequestLog"]).PropertyId;
			request.AppInstanceId = ((RequestLogModel)httpContext.Items["RequestLog"]).AppInstanceId;
			request.AppTypeId = ((RequestLogModel)httpContext.Items["RequestLog"]).AppTypeId;
			_stopwatch.Stop();
			request.ProcessDuration = _stopwatch.Elapsed.TotalSeconds;
			await _dbContext.SaveChangesAsync();
		}

		public async Task ExceptionIndiactor(HttpContext httpContext, RequestLogModel requestLog, Exception ex)
		{
			try
			{
				var request = await _dbContext.RequestLogs.FindAsync(requestLog.Id);
				request.ResponseStatusCode = httpContext.Response.StatusCode;
				request.ExceptionMessage = ex.GetFullMessage();
				request.ExceptionTitle = ex.Message;
				request.HadException = true;
				request.Failed = true;
				_stopwatch.Stop();
				request.ProcessDuration = _stopwatch.Elapsed.TotalSeconds;
				await _dbContext.SaveChangesAsync();
			}
			catch (Exception loggingException)
			{
				_logger.LogError(ex, "An error occured while processing the request.");
				_logger.LogError(loggingException, "Additionally, an error occured while logging it to database.");
			}
		}

		public void Dispose()
		{
			_dbContext.Dispose();
		}
	}
}

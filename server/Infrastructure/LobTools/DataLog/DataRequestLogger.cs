using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.AspNetCore.Http;
using MiddleWare.Log;
using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.LobTools.DataRequestLog
{
	public class DataRequestLogger
	{
		public LobToolsDbContext _dbContext;
		public DataRequestLogger(LobToolsDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<DataLog> RequestIndiactor(HttpContext httpContext)
		{
			var request = new DataLog
			{
				RequestLogId = ((RequestLogModel)httpContext.Items["RequestLog"]).Id,
			};
			#region Get Request Body
			var timer = Stopwatch.StartNew();
			request.Body = await new StreamReader(httpContext.Request.Body).ReadToEndAsync();
			var injectedRequestStream = new MemoryStream();
			var bytesToWrite = Encoding.UTF8.GetBytes(request.Body);
			injectedRequestStream.Write(bytesToWrite, 0, bytesToWrite.Length);
			injectedRequestStream.Seek(0, SeekOrigin.Begin);
			httpContext.Request.Body = injectedRequestStream;
			#endregion
			return request;
		}
		public async Task ResponseIndiactor(HttpContext httpContext, DataLog datatLog)
		{
			_dbContext.DataLogs.Add(datatLog);
			await _dbContext.SaveChangesAsync();
		}
	}
}

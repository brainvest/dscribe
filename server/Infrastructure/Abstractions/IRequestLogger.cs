using Brainvest.Dscribe.Abstractions.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace MiddleWare.Log
{
	public interface IRequestLogger
	{
		Task<RequestLogModel> RequestIndiactor(HttpContext httpContext);
		Task ResponseIndiactor(HttpContext httpContext, RequestLogModel requestLog);
		Task ExceptionIndiactor(HttpContext httpContext, RequestLogModel requestLog, Exception ex);
	}
}

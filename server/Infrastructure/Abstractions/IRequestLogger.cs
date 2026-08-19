namespace MiddleWare.Log;

using System;
using System.Threading.Tasks;
using Brainvest.Dscribe.Abstractions.Models;
using Microsoft.AspNetCore.Http;

public interface IRequestLogger
{
	Task<RequestLogModel> RequestIndiactor(HttpContext httpContext);
	Task ResponseIndiactor(HttpContext httpContext, RequestLogModel requestLog);
	Task ExceptionIndiactor(HttpContext httpContext, RequestLogModel requestLog, Exception ex);
}

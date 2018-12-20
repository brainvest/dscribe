using Microsoft.AspNetCore.Builder;

namespace MiddleWare.Log
{
	public static class LoggingExtension
	{
		public static IApplicationBuilder UseLogger(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<LoggerMiddleware>();
		}
	}
}

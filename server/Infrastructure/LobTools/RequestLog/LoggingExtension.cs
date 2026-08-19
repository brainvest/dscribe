namespace MiddleWare.Log;

using Microsoft.AspNetCore.Builder;

public static class LoggingExtension
{
	public static IApplicationBuilder UseLogger(this IApplicationBuilder builder)
	{
		return builder.UseMiddleware<LoggerMiddleware>();
	}
}

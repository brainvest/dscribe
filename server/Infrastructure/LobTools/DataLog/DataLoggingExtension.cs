using Microsoft.AspNetCore.Builder;

namespace MiddleWare.DataLog
{
	public static class DataLoggingExtension
	{
		public static IApplicationBuilder UseLogger(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<DataLoggerMiddleware>();
		}
	}
}

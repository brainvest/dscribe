using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.LobTools.DataLog;
using Brainvest.Dscribe.Runtime.ObjectGraphHandling;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Implementations.EfCore.BusinessDataAccess
{
	public static class RegistrationExtensions
	{
		public static IServiceCollection RegisterEfCoreDataAccess(this IServiceCollection services)
		{
			services.AddScoped<IEntityValidator, EfCoreEntityValidator>();
			services.AddScoped<IEntityHandler, EfCoreEntityHandler>();
			services.AddScoped<IDataLogImplementation, DataLogBusiness>();
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddScoped<EfCoreEntityHandlerInternal, EfCoreEntityHandlerInternal>();
			services.AddScoped<IObjectGraphHandler, HeavyOrmObjectGraphHandler>();
			return services;
		}
	}
}
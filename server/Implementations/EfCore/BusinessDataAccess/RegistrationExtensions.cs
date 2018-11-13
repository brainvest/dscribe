using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Runtime.ObjectGraphHandling;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Implementations.EfCore.BusinessDataAccess
{
	public static class RegistrationExtensions
	{
		public static IServiceCollection RegisterEfCoreDataAccess(this IServiceCollection services)
		{
			services.AddScoped<IEntityValidator, EfCoreEntityValidator>();
			services.AddScoped<IEntityHandler, EfCoreEntityHandler>();
			services.AddScoped<EfCoreEntityHandlerInternal, EfCoreEntityHandlerInternal>();
			services.AddScoped<IObjectGraphHandler, HeavyOrmObjectGraphHandler>();
			return services;
		}
	}
}
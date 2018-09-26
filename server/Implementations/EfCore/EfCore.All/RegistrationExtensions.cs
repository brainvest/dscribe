using Brainvest.Dscribe.Implementations.EfCore.BusinessDataAccess;
using Brainvest.Dscribe.Implementations.EfCore.CodeGenerator;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Implementations.EfCore.All
{
	public static class RegistrationExtensions
	{
		public static IServiceCollection RegisterEfCore(this IServiceCollection services)
		{
			return services.RegisterEfCoreDataAccess().RegisterEfCoreAssemblyGeneration();
		}
	}
}
namespace Brainvest.Dscribe.Implementations.EfCore.CodeGenerator;

using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Microsoft.Extensions.DependencyInjection;

public static class RegistrationExtensions
{
	public static IServiceCollection RegisterEfCoreAssemblyGeneration(this IServiceCollection services)
	{
		services.AddTransient<IBusinessAssemblyGenerator, EfCoreAssemblyGenerator>();
		return services;
	}
}

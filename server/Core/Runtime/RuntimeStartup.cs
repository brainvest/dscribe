using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.Implementations.EfCore.BusinessDataAccess;
using Brainvest.Dscribe.Implementations.EfCore.CodeGenerator;
using Brainvest.Dscribe.Runtime.AccessControl;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Runtime
{
	public class RuntimeStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
		{
			services.AddMultitenancy<IImplementationsContainer, ImplementationResolver>();

			services.AddScoped<IEntityValidator, EfCoreEntityValidator>();
			services.AddScoped<IEntityHandler, EfCoreEntityHandler>();
			services.AddScoped<EfCoreEntityHandlerInternal, EfCoreEntityHandlerInternal>();
			services.AddTransient<IBusinessCodeGenerator, EfCoreCodeGenerator>();
			services.AddTransient<IBusinessCompiler, EfCoreCompiler>();
			services.AddScoped<EntityHelper, EntityHelper>();
			services.AddSingleton<IPermissionService, PermissionCache>();
			services.Configure<GlobalConfiguration>(configuration.GetSection(nameof(GlobalConfiguration)));
		}

		public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseMultitenancy<IImplementationsContainer>();
		}
	}
}
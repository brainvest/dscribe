using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.Runtime.AccessControl;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Runtime
{
	public class RuntimeStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration, int? defaultAppInstanceId = null)
		{
			services.AddMultitenancy<IImplementationsContainer, ImplementationResolver>();
			services.AddSingleton(new ImplementationResolverOptions
			{
				DefaultAppInstanceId = defaultAppInstanceId
			});
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
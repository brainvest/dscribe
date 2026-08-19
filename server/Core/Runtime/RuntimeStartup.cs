namespace Brainvest.Dscribe.Runtime;

using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.LobTools;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.Runtime.AccessControl;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public class RuntimeStartup
{
	public static void ConfigureServices(IServiceCollection services, IConfiguration configuration
		, ImplementationResolverOptions implementationResolverOptions = null)
	{

		services.RegisterDbContext<MetadataDbContext>(configuration, "Metadata", "Runtime");

		services.AddMultitenancy<IImplementationsContainer, ImplementationResolver>();
		services.AddSingleton(implementationResolverOptions ?? new ImplementationResolverOptions { });
		services.AddScoped<EntityHelper, EntityHelper>();
		services.AddSingleton<IPermissionService, PermissionCache>();
		services.AddSingleton<IUsersService, UsersCache>();
		services.Configure<GlobalConfiguration>(configuration.GetSection(nameof(GlobalConfiguration)));
		var globaConfig = configuration.GetSection(nameof(GlobalConfiguration)).Get<GlobalConfiguration>() ?? new GlobalConfiguration();
		services.AddSingleton<IGlobalConfiguration>(globaConfig);
		LobToolsStartup.ConfigureServices(services, configuration, implementationResolverOptions?.DefaultAppInstanceId);
	}

	public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		app.UseMultitenancy<IImplementationsContainer>();
		LobToolsStartup.Configure(app, env);
	}
}

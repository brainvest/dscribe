using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.LobTools;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.Runtime.AccessControl;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Brainvest.Dscribe.Runtime
{
	public class RuntimeStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration
			, Action<DbContextOptionsBuilder, string> efProviderSetup, int? defaultAppInstanceId = null)
		{
			services.AddDbContext<MetadataDbContext>(options => efProviderSetup(options, "Metadata"));
			services.AddMultitenancy<IImplementationsContainer, ImplementationResolver>();
			services.AddSingleton(new ImplementationResolverOptions
			{
				DefaultAppInstanceId = defaultAppInstanceId
			});
			services.AddScoped<EntityHelper, EntityHelper>();
			services.AddSingleton<IPermissionService, PermissionCache>();
			services.AddSingleton<IUsersService, UsersCache>();
			services.Configure<GlobalConfiguration>(configuration.GetSection(nameof(GlobalConfiguration)));
			LobToolsStartup.ConfigureServices(services, configuration, efProviderSetup, defaultAppInstanceId);
		}

		public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseMultitenancy<IImplementationsContainer>();
			LobToolsStartup.Configure(app, env);
		}
	}
}
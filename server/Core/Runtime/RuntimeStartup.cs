using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.LobTools;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.Runtime.AccessControl;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Migrations_Runtime_MySql;
using Migrations_Runtime_PostgreSql;
using System;

namespace Brainvest.Dscribe.Runtime
{
	public class RuntimeStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration
			, Action<DbContextOptionsBuilder, string> efProviderSetup, ImplementationResolverOptions implementationResolverOptions = null)
		{

			var provider = configuration.GetSection("EfProvider").Get<string>();
			if (string.IsNullOrWhiteSpace(provider))
			{
				Console.WriteLine("Error: database provider is not set, the expected name is: EfProvider");
			}
			var connectionString = configuration.GetConnectionString("Metadata");
			if (string.IsNullOrWhiteSpace(connectionString))
			{
				Console.WriteLine("Error: Metadata Connection string is not set, the expected name is: Metadata");
			}

			switch (provider)
			{
				case "MySql":
					services.AddDbContext<MetadataDbContext, MetadataDbContext_MySql>(
						options => options.UseMySql(connectionString,
						x => x.MigrationsAssembly(typeof(MetadataDbContext_MySql).Assembly.GetName().Name)
							.MigrationsHistoryTable(HistoryRepository.DefaultTableName.ToLowerInvariant())));
					break;
				case "SqlServer":
					services.AddDbContext<MetadataDbContext>(options => options.UseSqlServer(connectionString));
					break;
				case "PostgreSql":
				case "PostgreSQL":
					services.AddDbContext<MetadataDbContext, MetadataDbContext_PostgreSql>(options => options.UseNpgsql(connectionString,
						x => x.MigrationsAssembly(typeof(MetadataDbContext_PostgreSql).Assembly.GetName().Name)));
					break;
				default:
					throw new NotImplementedException($"The provider {provider} is not implemented yet.");
			}

			services.AddMultitenancy<IImplementationsContainer, ImplementationResolver>();
			services.AddSingleton(implementationResolverOptions ?? new ImplementationResolverOptions{});
			services.AddScoped<EntityHelper, EntityHelper>();
			services.AddSingleton<IPermissionService, PermissionCache>();
			services.AddSingleton<IUsersService, UsersCache>();
			services.Configure<GlobalConfiguration>(configuration.GetSection(nameof(GlobalConfiguration)));
			var globaConfig = configuration.GetSection(nameof(GlobalConfiguration)).Get<GlobalConfiguration>();
			services.AddSingleton<IGlobalConfiguration, GlobalConfiguration>();
			LobToolsStartup.ConfigureServices(services, configuration, efProviderSetup, implementationResolverOptions?.DefaultAppInstanceId);
		}

		public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseMultitenancy<IImplementationsContainer>();
			LobToolsStartup.Configure(app, env);
		}
	}
}
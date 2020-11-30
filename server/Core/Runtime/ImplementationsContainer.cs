using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.Metadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Migrations_Runtime_MySql;
using Migrations_Runtime_PostgreSql;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime
{
	public class ImplementationContainer : IImplementationsContainer
	{
		private ImplementationContainer() { }
		private DbContextOptions _dbContextOptions;

		public static async Task<ImplementationContainer> Create(IServiceScope scope, MetadataDbContext dbContext, int appInstanceId)
		{
			var instance = await dbContext.AppInstances.FirstOrDefaultAsync(x => x.Id == appInstanceId);
			if (instance == null)
			{
				return null;
			}
			if (!instance.IsEnabled)
			{
				return null;
			}
			var appType = await dbContext.AppTypes.FirstOrDefaultAsync(x => x.Id == instance.AppTypeId);
			var bundle = await MetadataBundle.FromDbWithoutNavigations(dbContext, instance.AppTypeId, instance.Id);
			bundle.FixupRelationships();
			var metadataCache = new MetadataCache(bundle);
			var metadataModel = new MetadataModel(bundle);
			var globalConfig = scope.ServiceProvider.GetRequiredService<IOptions<GlobalConfiguration>>().Value;
			var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
			var dataConnectionStringTemplate = config.GetConnectionString(instance.DataConnectionStringTemplateName);
			if (string.IsNullOrWhiteSpace(dataConnectionStringTemplate))
			{
				var logger = scope.ServiceProvider.GetRequiredService<ILogger<ImplementationContainer>>();
				logger.LogError($"No connection stirng named \"{instance.DataConnectionStringTemplateName}\" which is required for app instance {instance.Name}");
			}
			var lobConnectionStringTemplate = config.GetConnectionString(instance.LobConnectionStringTemplateName);
			if (string.IsNullOrWhiteSpace(lobConnectionStringTemplate))
			{
				var logger = scope.ServiceProvider.GetRequiredService<ILogger<ImplementationContainer>>();
				logger.LogError($"No connection stirng named \"{instance.LobConnectionStringTemplateName}\" which is required for app instance {instance.Name}");
			}
			InstanceSettings instanceSettings = null;
			globalConfig?.InstanceSettings?.TryGetValue(instance.Name, out instanceSettings);
			var instanceInfo = new InstanceInfo
			{
				AppInstanceId = appInstanceId,
				AppTypeId = appType.Id,
				InstanceName = instance.Name,
				Provider = instance.DatabaseProviderId,
				DataConnectionString = GetConnectionString(dataConnectionStringTemplate, instance.MainDatabaseName),
				LobConnectionString = GetConnectionString(lobConnectionStringTemplate, instance.LobDatabaseName),
				MigrateDatabase = instance.MigrateDatabase,
				GeneratedCodeNamespace = instance.GeneratedCodeNamespace,
				DbContextName = instance.DbContextName,
				InstanceSettings = instanceSettings,
				LoadBusinessFromAssemblyName = instanceSettings?.LoadBusinessFromAssemblyName,
				SortOrder = instance.SortOrder,
			};

			var bridge = new BusinessAssemblyBridge(
				instanceInfo, globalConfig,
				scope.ServiceProvider.GetRequiredService<ILogger<BusinessAssemblyBridge>>());
			var reflector = new BusinessReflector(metadataCache);

			var implementationsContainer = new ImplementationContainer
			{
				Metadata = metadataCache,
				MetadataModel = metadataModel,
				BusinessAssemblyBridge = bridge,
				Reflector = reflector,
				InstanceInfo = instanceInfo
			};

			switch (instanceInfo.Provider)
			{
				case DatabaseProviderEnum.MySql:
					var mySqlDbContextOptionsBuilder = new DbContextOptionsBuilder<LobToolsDbContext_MySql>();
					implementationsContainer._lobToolsDbContextOptions = mySqlDbContextOptionsBuilder
					.UseMySql(instanceInfo.LobConnectionString, ServerVersion.AutoDetect(instanceInfo.LobConnectionString)).Options;
					break;
				case DatabaseProviderEnum.SqlServer:
					var lobToolsDbContextOptionsBuilder = new DbContextOptionsBuilder<LobToolsDbContext>();
					implementationsContainer._lobToolsDbContextOptions = lobToolsDbContextOptionsBuilder.UseSqlServer(instanceInfo.LobConnectionString).Options;
					break;
				case DatabaseProviderEnum.PostgreSql:
					var postgreSqlDbContextOptionsBuilder = new DbContextOptionsBuilder<LobToolsDbContext_PostgreSql>();
					implementationsContainer._lobToolsDbContextOptions = postgreSqlDbContextOptionsBuilder.UseNpgsql(instanceInfo.LobConnectionString).Options;
					break;
				default:
					throw new NotImplementedException($"The provider {instanceInfo.Provider} is not implemented");
			}
			if (bridge.BusinessDbContextFactory == null)
			{
				scope.ServiceProvider.GetRequiredService<ILogger<ImplementationContainer>>().LogError($"Business assembly not loaded");
			}
			else
			{
				var dbContextType = bridge.BusinessDbContextFactory.GetType().Assembly.GetTypes().Single(x => x.IsPublic && x.IsSubclassOf(typeof(DbContext)));
				reflector.RegisterAssembly(dbContextType.Assembly);
				var dbContextOptionsBuilder = Activator.CreateInstance(typeof(DbContextOptionsBuilder<>).MakeGenericType(dbContextType)) as DbContextOptionsBuilder;
				switch (instanceInfo.Provider)
				{
					case DatabaseProviderEnum.MySql:
						implementationsContainer._dbContextOptions = dbContextOptionsBuilder
						.UseMySql(instanceInfo.DataConnectionString, ServerVersion.AutoDetect(instanceInfo.DataConnectionString)).Options;
						break;
					case DatabaseProviderEnum.SqlServer:
						implementationsContainer._dbContextOptions = dbContextOptionsBuilder.UseSqlServer(instanceInfo.DataConnectionString).Options;
						break;
					case DatabaseProviderEnum.PostgreSql:
						implementationsContainer._dbContextOptions = dbContextOptionsBuilder.UseNpgsql(instanceInfo.DataConnectionString).Options;
						break;
					default:
						throw new NotImplementedException($"The provider {instanceInfo.Provider} is not implemented");
				}
			}
			return implementationsContainer;
		}

		private static string GetConnectionString(string template, string databaseName)
		{
			return template.Replace("{database}", databaseName, ignoreCase:true, CultureInfo.InvariantCulture);
		}

		public IMetadataCache Metadata { get; private set; }
		public IMetadataModel MetadataModel { get; private set; }
		private BusinessAssemblyBridge BusinessAssemblyBridge { get; set; }
		public IBusinessReflector Reflector { get; private set; }
		public IInstanceInfo InstanceInfo { get; private set; }

		private DbContextOptions _lobToolsDbContextOptions;

		public IDisposable GetBusinessRepository()
		{
			return BusinessAssemblyBridge.BusinessDbContextFactory.GetDbContext(_dbContextOptions);
		}

		public DbContext GetLobToolsRepository()
		{
			switch (InstanceInfo.Provider)
			{
				case DatabaseProviderEnum.MySql:
					return new LobToolsDbContext_MySql(_lobToolsDbContextOptions as DbContextOptions<LobToolsDbContext_MySql>);
				case DatabaseProviderEnum.SqlServer:
					return new LobToolsDbContext(_lobToolsDbContextOptions);
				case DatabaseProviderEnum.PostgreSql:
					return new LobToolsDbContext_PostgreSql(_lobToolsDbContextOptions as DbContextOptions<LobToolsDbContext_PostgreSql>);
				default:
					throw new NotImplementedException($"The provider {InstanceInfo.Provider} is not implemented");
			};
		}

		public bool MigrationsExecuted { get; set; }

		public void DisposeMembers()
		{
			(Metadata as IDisposable)?.Dispose();
			(MetadataModel as IDisposable)?.Dispose();
			(Reflector as IDisposable)?.Dispose();
			(InstanceInfo as IDisposable)?.Dispose();
			(BusinessAssemblyBridge as IDisposable)?.Dispose();
		}
	}
}

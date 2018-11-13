using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Metadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
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
			var instanceInfo = new InstanceInfo
			{
				AppInstanceId = appInstanceId,
				AppTypeId = appType.Id,
				InstanceName = instance.Name,
				Provider = instance.DatabaseProviderId,
				ConnectionString = instance.DataConnectionString,
				MigrateDatabase = instance.MigrateDatabase,
				GeneratedCodeNamespace = instance.GeneratedCodeNamespace
			};

			var bridge = new BusinessAssemblyBridge(
				instanceInfo,
				scope.ServiceProvider.GetRequiredService<IOptions<GlobalConfiguration>>().Value,
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

			if (bridge.BusinessDbContextFactory == null)
			{
				scope.ServiceProvider.GetRequiredService<ILogger<ImplementationContainer>>().LogError($"Business assembly not loaded");
			}
			else
			{
				var dbContextType = bridge.BusinessDbContextFactory.GetType().Assembly.GetTypes().Single(x => x.IsSubclassOf(typeof(DbContext)));
				reflector.RegisterAssembly(dbContextType.Assembly);
				var dbContextOptionsBuilder = Activator.CreateInstance(typeof(DbContextOptionsBuilder<>).MakeGenericType(dbContextType)) as DbContextOptionsBuilder;
				var lobToolsDbContextOptionsBuilder = new DbContextOptionsBuilder<LobToolsDbContext>();
				switch (instanceInfo.Provider)
				{
					case DatabaseProviderEnum.MySql:
						implementationsContainer._dbContextOptions = dbContextOptionsBuilder.UseMySql(instanceInfo.ConnectionString).Options;
						implementationsContainer._lobToolsDbContextOptions = lobToolsDbContextOptionsBuilder.UseMySql(instanceInfo.ConnectionString).Options;
						break;
					case DatabaseProviderEnum.SqlServer:
						implementationsContainer._dbContextOptions = dbContextOptionsBuilder.UseSqlServer(instanceInfo.ConnectionString).Options;
						implementationsContainer._lobToolsDbContextOptions = lobToolsDbContextOptionsBuilder.UseSqlServer(instanceInfo.ConnectionString).Options;
						break;
					default:
						throw new NotImplementedException($"The provider {instanceInfo.Provider} is not implemented");
				}
			}
			return implementationsContainer;
		}

		public IMetadataCache Metadata { get; private set; }
		public IMetadataModel MetadataModel { get; private set; }
		private BusinessAssemblyBridge BusinessAssemblyBridge { get; set; }
		public IBusinessReflector Reflector { get; private set; }
		public IInstanceInfo InstanceInfo { get; private set; }

		private DbContextOptions<LobToolsDbContext> _lobToolsDbContextOptions;

		public Func<IDisposable> RepositoryFactory
		{
			get
			{
				return () => BusinessAssemblyBridge.BusinessDbContextFactory.GetDbContext(_dbContextOptions);
			}
		}

		public Func<DbContext> LobToolsRepositoryFactory
		{
			get
			{
				return () => new LobToolsDbContext(_lobToolsDbContextOptions);
			}
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
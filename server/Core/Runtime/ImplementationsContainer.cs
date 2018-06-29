using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Metadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime
{
	public class ImplementationContainer : IImplementationsContainer
	{
		private ImplementationContainer() { }

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
			var semanticCache = new MetadataCache(bundle);
			var semanticModel = new MetadataModel(bundle);
			var instanceInfo = new InstanceInfo
			{
				AppInstanceId = appInstanceId,
				AppTypeId = appType.Id,
				InstanceName = instance.Name,
				ConnectionString = instance.DataConnectionString,
				MigrateDatabase = instance.MigrateDatabase
			};
			var bridge = new BusinessAssemblyBridge(instanceInfo, scope.ServiceProvider.GetService<IGlobalConfiguration>(), scope.ServiceProvider.GetService<ILogger>());
			var reflector = new BusinessReflector(semanticCache);
			if (bridge.BusinessDbContextFactory == null)
			{
				scope.ServiceProvider.GetRequiredService<ILogger<ImplementationContainer>>().LogError($"Business assembly not loaded");
			}
			else
			{
				reflector.RegisterAssembly(bridge.BusinessDbContextFactory.GetDbContext(instance.DataConnectionString).GetType().Assembly);
			}

			return new ImplementationContainer
			{
				Metadata = semanticCache,
				MetadataModel = semanticModel,
				BusinessAssemblyBridge = bridge,
				Reflector = reflector,
				InstanceInfo = instanceInfo
			};
		}

		public IMetadataCache Metadata { get; private set; }
		public IMetadataModel MetadataModel { get; private set; }
		private BusinessAssemblyBridge BusinessAssemblyBridge { get; set; }
		public IBusinessReflector Reflector { get; private set; }
		public IInstanceInfo InstanceInfo { get; private set; }
		public Func<object> RepositoryFactory
		{
			get
			{
				return () => BusinessAssemblyBridge.BusinessDbContextFactory.GetDbContext(InstanceInfo.ConnectionString);
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
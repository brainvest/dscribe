using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using SaasKit.Multitenancy;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime
{
	public class ImplementationFactory
	{
		private static ConcurrentDictionary<int, Lazy<Task<ImplementationContainer>>> _implementations =
			new ConcurrentDictionary<int, Lazy<Task<ImplementationContainer>>>();

		public static async Task<ImplementationContainer> GetContainer(HttpContext httpContext)
		{
			if (!httpContext.Request.Headers.TryGetValue("AppInstance", out var appInstanceHeaders))
			{
				return null;
			}
			if (appInstanceHeaders.Count == 0)
			{
				return null;
			}
			if (appInstanceHeaders.Count > 1)
			{
				throw new Exception("The AppInstance header should be specified exactly once");
			}
			if (!int.TryParse(appInstanceHeaders.Single(), out var appInstanceId))
			{
				throw new Exception("The AppInstance header should be an integer");
			}
			var task = _implementations.GetOrAdd(appInstanceId, id => new Lazy<Task<ImplementationContainer>>(() => CreateImplementation(id, httpContext)));
			return await task.Value;
		}

		private static async Task<ImplementationContainer> CreateImplementation(int appInstanceId, HttpContext httpContext)
		{
			var scopeFactory = httpContext.RequestServices.GetService<IServiceScopeFactory>();
			using (var scope = scopeFactory.CreateScope())
			using (var dbContext = scope.ServiceProvider.GetService<MetadataDbContext>())
			{
				return await ImplementationContainer.Create(scope, dbContext, appInstanceId);
			}
		}
	}

	public class ImplementationResolver : ITenantResolver<IImplementationsContainer>
	{
		public async Task<TenantContext<IImplementationsContainer>> ResolveAsync(HttpContext context)
		{
			var container = await ImplementationFactory.GetContainer(context);
			if (container == null)
			{
				return null;
			}
			return new TenantContext<IImplementationsContainer>(container);
		}
	}

	public class MetadataModelResolver : ITenantResolver<IMetadataModel>
	{
		public async Task<TenantContext<IMetadataModel>> ResolveAsync(HttpContext context)
		{
			var container = await ImplementationFactory.GetContainer(context);
			if (container == null)
			{
				return null;
			}
			return new TenantContext<IMetadataModel>(container.MetadataModel);
		}
	}

	public class BusinessReflectorResolver : ITenantResolver<IBusinessReflector>
	{
		public async Task<TenantContext<IBusinessReflector>> ResolveAsync(HttpContext context)
		{
			var container = await ImplementationFactory.GetContainer(context);
			if (container == null)
			{
				return null;
			}
			return new TenantContext<IBusinessReflector>(container.Reflector);
		}
	}

	public class InstanceResolver : ITenantResolver<IInstanceInfo>
	{
		public async Task<TenantContext<IInstanceInfo>> ResolveAsync(HttpContext context)
		{
			var container = await ImplementationFactory.GetContainer(context);
			if (container == null)
			{
				return null;
			}
			return new TenantContext<IInstanceInfo>(container.InstanceInfo);
		}
	}
}
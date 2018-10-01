using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using SaasKit.Multitenancy;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime
{
	public class ImplementationFactory
	{
		private static ConcurrentDictionary<int, Lazy<Task<ImplementationContainer>>> _implementations =
			new ConcurrentDictionary<int, Lazy<Task<ImplementationContainer>>>();

		public static async Task<ImplementationContainer> GetContainer(HttpContext httpContext, ImplementationResolverOptions options)
		{
			int appInstanceId;
			if (!httpContext.Request.Headers.TryGetValue("AppInstance", out var appInstanceHeaders) || appInstanceHeaders.Count == 0)
			{
				if (options?.DefaultAppInstanceId == null)
				{
					return null;
				}
				appInstanceId = options.DefaultAppInstanceId.Value;
			}
			else if (appInstanceHeaders.Count > 1)
			{
				throw new Exception("The AppInstance header should be specified exactly once");
			}
			else if (!int.TryParse(appInstanceHeaders.Single(), out appInstanceId))
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

	public class ImplementationResolverOptions
	{
		// if this is provided, it will be used if the request does not contain the app instance header
		public int? DefaultAppInstanceId { get; set; }
	}

	public class ImplementationResolver : ITenantResolver<IImplementationsContainer>
	{
		private readonly ImplementationResolverOptions _options;
		public ImplementationResolver(ImplementationResolverOptions options)
		{
			_options = options;
		}

		public async Task<TenantContext<IImplementationsContainer>> ResolveAsync(HttpContext context)
		{
			var container = await ImplementationFactory.GetContainer(context, _options);
			if (container == null)
			{
				return null;
			}
			return new TenantContext<IImplementationsContainer>(container);
		}
	}

	public class MetadataModelResolver : ITenantResolver<IMetadataModel>
	{
		private readonly ImplementationResolverOptions _options;
		public MetadataModelResolver(ImplementationResolverOptions options)
		{
			_options = options;
		}

		public async Task<TenantContext<IMetadataModel>> ResolveAsync(HttpContext context)
		{
			var container = await ImplementationFactory.GetContainer(context, _options);
			if (container == null)
			{
				return null;
			}
			return new TenantContext<IMetadataModel>(container.MetadataModel);
		}
	}

	public class BusinessReflectorResolver : ITenantResolver<IBusinessReflector>
	{
		private readonly ImplementationResolverOptions _options;
		public BusinessReflectorResolver(ImplementationResolverOptions options)
		{
			_options = options;
		}

		public async Task<TenantContext<IBusinessReflector>> ResolveAsync(HttpContext context)
		{
			var container = await ImplementationFactory.GetContainer(context, _options);
			if (container == null)
			{
				return null;
			}
			return new TenantContext<IBusinessReflector>(container.Reflector);
		}
	}

	public class InstanceResolver : ITenantResolver<IInstanceInfo>
	{
		private readonly ImplementationResolverOptions _options;
		public InstanceResolver(ImplementationResolverOptions options)
		{
			_options = options;
		}

		public async Task<TenantContext<IInstanceInfo>> ResolveAsync(HttpContext context)
		{
			var container = await ImplementationFactory.GetContainer(context, _options);
			if (container == null)
			{
				return null;
			}
			return new TenantContext<IInstanceInfo>(container.InstanceInfo);
		}
	}
}
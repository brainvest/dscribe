using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.MetadataDbAccess.Entities.Security;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Brainvest.Dscribe.Runtime.AccessControl
{
	public class PermissionCache : IPermissionService
	{
		private class CachedInfo
		{
			public Dictionary<string, Guid> Roles { get; set; }
			public IEnumerable<Permission> Permissions { get; set; }
			public Dictionary<(string entityTypeName, int appTypeId), int> EntityTypes { get; set; }
		}

		// TODO: in a large application this list might get large and searching it will be slow, better to be replaced with a faster data structure
		private Lazy<CachedInfo> _cache;
		private readonly IServiceScopeFactory _serviceScopeFactory;

		public PermissionCache(IServiceScopeFactory serviceScopeFactory)
		{
			_serviceScopeFactory = serviceScopeFactory;
			CleanCache();
		}

		public void CleanCache()
		{
			_cache = new Lazy<CachedInfo>(FillCache, LazyThreadSafetyMode.ExecutionAndPublication);
		}

		private CachedInfo FillCache()
		{
			using (var scope = _serviceScopeFactory.CreateScope())
			using (var dbContext = scope.ServiceProvider.GetRequiredService<MetadataDbContext>())
			{
				var permissions = dbContext.Permissions.ToList();
				var roles = dbContext.Roles.ToDictionary(x => x.Name, x => x.Id);
				var entityTypes = dbContext.EntityTypes
					.ToDictionary(x => (x.Name, x.AppTypeId), x => x.Id);
				return new CachedInfo
				{
					EntityTypes = entityTypes,
					Permissions = permissions,
					Roles = roles
				};
			}
		}

		public bool IsAllowed(ActionRequestInfo action)
		{
			var cache = _cache.Value;
			var roles = action.Roles?.Select(x =>
			{
				if (cache.Roles.TryGetValue(x, out var r))
				{
					return r;
				}
				return (Guid?)null;
			}).Where(x => x.HasValue).ToArray();
			int? entityTypeId = null;
			if (action.EntityTypeName != null && action.AppTypeId.HasValue)
			{
				if (cache.EntityTypes.TryGetValue((action.EntityTypeName, action.AppTypeId.Value), out var id))
				{
					entityTypeId = id;
				}
			}

			var permissions = cache.Permissions.Where(x =>
				(!x.UserId.HasValue || x.UserId == action.UserId) &&
				(!x.RoleId.HasValue || roles.Contains(x.RoleId.Value)) &&
				(!x.ActionTypeId.HasValue || x.ActionTypeId == action.ActionType) &&
				(string.IsNullOrWhiteSpace(x.ActionName) || x.ActionName == action.ActionName) &&
				(!x.AppInstanceId.HasValue || x.AppInstanceId == action.AppInstanceId) &&
				(!x.EntityTypeId.HasValue || x.EntityTypeId == entityTypeId));
			var any = false;
			foreach (var permission in permissions)
			{
				if (permission.PermissionType == PermissionType.Deny)
				{
					return false;
				}
				any = true;
			}
			return any;
		}

	}
}

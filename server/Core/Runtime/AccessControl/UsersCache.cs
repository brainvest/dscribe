using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Transactions;

namespace Brainvest.Dscribe.Runtime.AccessControl
{
	public class UsersCache : IUsersService
	{
		private class CachedInfo
		{
			public Dictionary<string, Guid> UserIds { get; set; }
		}

		private Lazy<CachedInfo> _cache;
		private readonly IServiceScopeFactory _serviceScopeFactory;

		public UsersCache(IServiceScopeFactory serviceScopeFactory)
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
			using (var dbContext = scope.ServiceProvider.GetRequiredService<LobToolsDbContext>())
			{
				var userIds = dbContext.Users.ToDictionary(x => x.UnifiedExternalUserId, x => x.Id);
				return new CachedInfo
				{
					UserIds = userIds
				};
			}
		}

		string UnifyUserName(string externalUserName)
		{
			if (Guid.TryParse(externalUserName, out var id))
			{
				return id.ToString();
			}
			return externalUserName.ToLower();
		}

		private Guid GetOrCreateUser(string externalUserId)
		{
			var unified = UnifyUserName(externalUserId);
			using (var scope = _serviceScopeFactory.CreateScope())
			using (var dbContext = scope.ServiceProvider.GetRequiredService<LobToolsDbContext>())
			using (var transaction = new TransactionScope(TransactionScopeOption.RequiresNew,
				new TransactionOptions { IsolationLevel = IsolationLevel.Serializable }))
			{
				var user = dbContext.Users.SingleOrDefault(x => x.UnifiedExternalUserId == unified);
				if (user != null)
				{
					_cache.Value.UserIds[unified] = user.Id;
					return user.Id;
				}
				user = new User
				{
					Id = Guid.NewGuid(),
					ExternalUserId = externalUserId,
					UnifiedExternalUserId = unified
				};
				dbContext.Users.Add(user);
				dbContext.SaveChanges();
				transaction.Complete();
				_cache.Value.UserIds[unified] = user.Id;
				return user.Id;
			}
		}

		public Guid? GetUserId(string externalUserId)
		{
			if (string.IsNullOrWhiteSpace(externalUserId))
			{
				return null;
			}
			var unified = UnifyUserName(externalUserId);
			if (_cache.Value.UserIds.TryGetValue(unified, out var userId))
			{
				return userId;
			}
			return GetOrCreateUser(externalUserId);
		}

		public Guid? GetUserId(ClaimsPrincipal principal)
		{
			return GetUserId(principal.FindFirst("sub")?.Value);
		}
	}
}

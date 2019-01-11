using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Abstractions
{
	public static class ImplementationsExtensions
	{
		public static TLobDbContext GetLobDbContext<TLobDbContext>(this IImplementationsContainer implementationsContainer, HttpContext httpContext)
			where TLobDbContext : DbContext
		{
			var factory = implementationsContainer?.LobToolsRepositoryFactory;
			if (factory != null)
			{
				var dbContext = factory();
				if (dbContext != null && dbContext is TLobDbContext lobDbContext)
				{
					return lobDbContext;
				}
			}
			return httpContext.RequestServices.GetRequiredService<TLobDbContext>();
		}
	}
}

using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Migrations_Runtime_MySql
{
	public class LobToolsDbContext_MySql(DbContextOptions<LobToolsDbContext_MySql> options) : LobToolsDbContext(options)
	{
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
			{
				entityType.SetTableName(entityType.GetTableName().ToLowerInvariant());
			}
		}
	}
}

namespace Migrations_Runtime_MySql;

using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

public class MetadataDbContext_MySql(DbContextOptions<MetadataDbContext_MySql> options) : MetadataDbContext(options)
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

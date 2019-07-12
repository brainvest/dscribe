using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Migrations_Runtime_MySql
{
	public class MetadataDbContext_MySql : MetadataDbContext
	{
		public MetadataDbContext_MySql(DbContextOptions<MetadataDbContext_MySql> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
			{
				entityType.Relational().TableName = entityType.Relational().TableName.ToLowerInvariant();
			}
		}
	}
}

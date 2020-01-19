using Brainvest.Dscribe.Security.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Migrations_Auth_MySql
{
	public class SecurityDbContext_MySql : SecurityDbContext
	{
		public SecurityDbContext_MySql(DbContextOptions<SecurityDbContext_MySql> options) :
			base(options)
		{
		}

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

using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.EntityFrameworkCore;

namespace Migrations_Runtime_PostgreSql
{
	public class MetadataDbContext_PostgreSql : MetadataDbContext
	{
		public MetadataDbContext_PostgreSql(DbContextOptions<MetadataDbContext_PostgreSql> options)
			: base(options)
		{
		}
	}
}

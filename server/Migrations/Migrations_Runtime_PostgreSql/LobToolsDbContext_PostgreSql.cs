using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.EntityFrameworkCore;

namespace Migrations_Runtime_PostgreSql
{
	public class LobToolsDbContext_PostgreSql : LobToolsDbContext
	{
		public LobToolsDbContext_PostgreSql(DbContextOptions<LobToolsDbContext_PostgreSql> options)
			: base(options)
		{
		}
	}
}

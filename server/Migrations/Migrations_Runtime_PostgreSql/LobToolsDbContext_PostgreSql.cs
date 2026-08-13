using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.EntityFrameworkCore;

namespace Migrations_Runtime_PostgreSql
{
	public class LobToolsDbContext_PostgreSql(DbContextOptions<LobToolsDbContext_PostgreSql> options) : LobToolsDbContext(options)
	{
	}
}

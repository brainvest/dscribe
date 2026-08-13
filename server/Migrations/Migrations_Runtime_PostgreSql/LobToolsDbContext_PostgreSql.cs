namespace Migrations_Runtime_PostgreSql;

using Brainvest.Dscribe.LobTools.Entities;
using Microsoft.EntityFrameworkCore;

public class LobToolsDbContext_PostgreSql(DbContextOptions<LobToolsDbContext_PostgreSql> options) : LobToolsDbContext(options)
{
}

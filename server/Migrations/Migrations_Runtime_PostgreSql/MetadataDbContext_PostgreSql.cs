namespace Migrations_Runtime_PostgreSql;

using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.EntityFrameworkCore;

public class MetadataDbContext_PostgreSql(DbContextOptions<MetadataDbContext_PostgreSql> options) : MetadataDbContext(options)
{
}

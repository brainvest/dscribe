namespace Migrations_Auth_PostgreSql;

using Brainvest.Dscribe.Security.Entities;
using Microsoft.EntityFrameworkCore;

public class SecurityDbContext_PostgreSql(DbContextOptions<SecurityDbContext_PostgreSql> options) : SecurityDbContext(options)
{
}

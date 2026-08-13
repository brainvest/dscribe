using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Brainvest.Dscribe.Security.Entities;

namespace Migrations_Auth_PostgreSql;

public class DesignTimeDbContextFactory_PostgreSql(IConfiguration configuration) : IDesignTimeDbContextFactory<SecurityDbContext>
{
	public SecurityDbContext CreateDbContext(string[] args)
	{
        var connectionString = configuration.GetConnectionString("Auth");
		var optionsBuilder = new DbContextOptionsBuilder<SecurityDbContext>();
        optionsBuilder.UseNpgsql(connectionString,
            x => x.MigrationsAssembly(typeof(SecurityDbContext).Assembly.GetName().Name));
        return new SecurityDbContext(optionsBuilder.Options);
	}
}

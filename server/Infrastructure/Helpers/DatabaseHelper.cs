using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Helpers;

public static class DatabaseHelper
{
    public static void RegisterDbContext<TContext>(this IServiceCollection services, IConfiguration configuration, string connectionStringName)
    where TContext : DbContext
    {
        var provider = configuration.GetSection("EfProvider").Get<string>();
		if (string.IsNullOrWhiteSpace(provider))
		{
			Console.WriteLine("Error: database provider is not set, the expected name is: EfProvider");
		}
		var connectionString = configuration.GetConnectionString(connectionStringName);
		if (string.IsNullOrWhiteSpace(connectionString))
		{
			Console.WriteLine($"Error: Connection string is not set, the expected name is: ConnectionStrings:{connectionStringName}");
		}

        services.AddDbContext<TContext>((Action<DbContextOptionsBuilder>)(provider switch
		{
			"MySql" => options => options.UseMySQL(connectionString),
			"SqlServer" => options => options.UseSqlServer(connectionString),
			"PostgreSql" or "PostgreSQL" => options => options.UseNpgsql(connectionString),
			_ => throw new NotImplementedException($"The provider {provider} is not implemented yet."),
		}));
    }
}

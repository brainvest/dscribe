using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Helpers;

public static class DatabaseHelper
{
	public static void RegisterDbContext<TContext>(this IServiceCollection services, IConfiguration configuration, string connectionStringName, string migrationsAssembly = "Auth")
	where TContext : DbContext
	{
		Console.WriteLine("Temp message: ensuring this is called");

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

		services.AddDbContext<TContext>(GetOptions(provider, connectionString, migrationsAssembly));
	}

	private static Action<DbContextOptionsBuilder> GetOptions(string provider, string connectionString, string migrationsAssembly)
	{
		return provider switch
		{
			"MySql" => options => options.UseMySQL(connectionString, b => b.MigrationsAssembly($"Brainvest.Dscribe.Migrations.{migrationsAssembly}.MySql")),
			"SqlServer" => options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly($"Brainvest.Dscribe.Migrations.{migrationsAssembly}.SqlServer")),
			"PostgreSql" or "PostgreSQL" => options => options.UseNpgsql(connectionString, b => b.MigrationsAssembly($"Brainvest.Dscribe.Migrations.{migrationsAssembly}.PostgreSql")),
			_ => throw new NotImplementedException($"The provider {provider} is not implemented yet."),
		};
	}
}

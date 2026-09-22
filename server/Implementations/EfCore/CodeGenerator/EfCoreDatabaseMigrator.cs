namespace Brainvest.Dscribe.Implementations.EfCore.CodeGenerator;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Scaffolding;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;

/// <summary>
/// Brings the business database in line with the model of the loaded business assembly without
/// relying on migration classes or a model snapshot: the database itself is reverse engineered
/// into an EF model, which plays the role of the "previous" model, and the differ produces the
/// operations needed to reach the current model.
/// </summary>
class EfCoreDatabaseMigrator
{
	public async Task<DatabaseMigrationResult> MigrateAsync(IImplementationsContainer implementationsContainer)
	{
		var instanceInfo = implementationsContainer.InstanceInfo;
		var result = new DatabaseMigrationResult();
		var diagnostics = new List<IDiagnosticInfo>();
		result.Diagnostics = diagnostics;
		try
		{
			using var context = implementationsContainer.GetBusinessRepository() as DbContext;
			if (context == null)
			{
				diagnostics.Add(new DiagnosticInfo { Message = "The business assembly is not loaded, generate the code first." });
				return result;
			}

			var creator = context.GetService<IRelationalDatabaseCreator>();
			if (!await creator.ExistsAsync())
			{
				if (instanceInfo.IsProduction)
				{
					result.Succeeded = true;
					result.SqlCommands = [creator.GenerateCreateScript()];
					return result;
				}
				await creator.CreateAsync();
			}

			var targetModel = context.GetService<IDesignTimeModel>().Model;
			var sourceModel = ReverseEngineerDatabase(context, instanceInfo.Provider, targetModel, diagnostics);

			var sourceTables = sourceModel.GetRelationalModel().Tables.ToList();
			var targetTables = targetModel.GetRelationalModel().Tables.ToList();

			var operations = context.GetService<IMigrationsModelDiffer>()
				.GetDifferences(sourceModel.GetRelationalModel(), targetModel.GetRelationalModel());
			// The reverse engineered model carries annotations the hand-built model does not (e.g. column order),
			// which yield AlterColumn operations that generate no SQL. Only real SQL counts as a difference.
			var commands = context.GetService<IMigrationsSqlGenerator>().Generate(operations, targetModel);
			result.SqlCommands = commands.Select(x => x.CommandText).ToList();
			if (commands.Count == 0 || instanceInfo.IsProduction)
			{
				if (commands.Count == 0)
				{
					diagnostics.Add(new DiagnosticInfo
					{
						Message = $"No changes to apply. Database ({context.Database.GetDbConnection().Database}) tables: "
							+ $"[{string.Join(", ", sourceTables.Select(FormatTable))}]; model tables: "
							+ $"[{string.Join(", ", targetTables.Select(FormatTable))}]; operations produced by the differ: "
							+ $"[{string.Join(", ", operations.Select(x => x.GetType().Name))}]."
					});
				}
				result.Succeeded = true;
				return result;
			}

			await context.GetService<IMigrationCommandExecutor>()
				.ExecuteNonQueryAsync(commands, context.GetService<IRelationalConnection>());
			result.Applied = true;
			result.Succeeded = true;
			return result;
		}
		catch (Exception ex)
		{
			diagnostics.Add(new DiagnosticInfo { Message = ex.ToString() });
			return result;
		}
	}

	private static string FormatTable(ITable table) => table.Schema == null ? table.Name : $"{table.Schema}.{table.Name}";

	private static IModel ReverseEngineerDatabase(
		DbContext context, DatabaseProviderEnum provider, IModel targetModel, List<IDiagnosticInfo> diagnostics)
	{
		var services = new ServiceCollection()
			.AddEntityFrameworkDesignTimeServices()
			.AddDbContextDesignTimeServices(context);
		GetProviderDesignTimeServices(provider).ConfigureDesignTimeServices(services);
		using var serviceProvider = services.BuildServiceProvider();

		var connection = context.Database.GetDbConnection();
		var databaseModel = serviceProvider.GetRequiredService<IDatabaseModelFactory>()
			.Create(connection, new DatabaseModelFactoryOptions());
		diagnostics.Add(new DiagnosticInfo
		{
			Message = $"Reverse engineered {connection.DataSource}, database '{connection.Database}'"
				+ $" (default schema '{databaseModel.DefaultSchema}'): "
				+ $"[{string.Join(", ", databaseModel.Tables.Select(x => x.Schema == null ? x.Name : $"{x.Schema}.{x.Name}"))}]."
		});
		RemoveTablesNotInModel(databaseModel, targetModel);

		return serviceProvider.GetRequiredService<IScaffoldingModelFactory>()
			.Create(databaseModel, new ModelReverseEngineerOptions { UseDatabaseNames = true, NoPluralize = true });
	}

	/// <summary>
	/// Tables that exist in the database but not in the model (e.g. __EFMigrationsHistory, LobTools tables sharing
	/// the database, or anything created manually) must not be reported as differences, otherwise the migration
	/// would drop them.
	/// </summary>
	private static void RemoveTablesNotInModel(DatabaseModel databaseModel, IModel targetModel)
	{
		var modelTables = targetModel.GetRelationalModel().Tables
			.Select(x => (Schema: x.Schema ?? databaseModel.DefaultSchema, x.Name))
			.ToHashSet();
		var unknownTables = databaseModel.Tables
			.Where(x => !modelTables.Contains((x.Schema ?? databaseModel.DefaultSchema, x.Name)))
			.ToList();
		foreach (var table in unknownTables)
		{
			databaseModel.Tables.Remove(table);
		}
	}

	/// <summary>
	/// Providers mark their design-time services (which include the reverse engineering factory) with
	/// <see cref="DesignTimeProviderServicesAttribute"/>; this is how the EF tooling locates them too.
	/// </summary>
	private static IDesignTimeServices GetProviderDesignTimeServices(DatabaseProviderEnum provider)
	{
		var providerAssembly = provider switch
		{
			DatabaseProviderEnum.SqlServer => typeof(SqlServerDbContextOptionsExtensions).Assembly,
			DatabaseProviderEnum.PostgreSql => typeof(NpgsqlDbContextOptionsBuilderExtensions).Assembly,
			DatabaseProviderEnum.MySql => typeof(MySQLDbContextOptionsExtensions).Assembly,
			_ => throw new NotImplementedException($"The provider {provider} is not implemented"),
		};
		var attribute = providerAssembly.GetCustomAttribute<DesignTimeProviderServicesAttribute>()
			?? throw new InvalidOperationException($"{providerAssembly.GetName().Name} does not expose design time services");
		var type = providerAssembly.GetType(attribute.TypeName, throwOnError: true);
		return (IDesignTimeServices)Activator.CreateInstance(type);
	}
}

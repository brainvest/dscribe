using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.InterfacesTo3rdParty.RichTextDocumentHandling;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.RequestLog;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MiddleWare.Log;
using Migrations_Runtime_MySql;
using System;

namespace Brainvest.Dscribe.LobTools
{
	public static class LobToolsStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration
			, Action<DbContextOptionsBuilder, string> efProviderSetup, int? defaultAppInstanceId = null)
		{
			services.AddScoped<IRichTextDocumentHandler, RichTextDocumentHandler>();
			services.AddScoped<RequestLogger>();

			var provider = configuration.GetSection("EfProvider").Get<string>();
			if (string.IsNullOrWhiteSpace(provider))
			{
				Console.WriteLine("Error: database provider is not set, the expected name is: EfProvider");
			}
			var connectionString = configuration.GetConnectionString("DefaultLob");
			if (string.IsNullOrWhiteSpace(connectionString))
			{
				Console.WriteLine("Error: Default Lob Connection string is not set, the expected name is: DefaultLob");
			}

			switch (provider)
			{
				case "MySql":
					services.AddDbContext<LobToolsDbContext, LobToolsDbContext_MySql>(
						options => options.UseMySql(connectionString,
						x => x.MigrationsAssembly(typeof(LobToolsDbContext_MySql).Assembly.GetName().Name)
							.MigrationsHistoryTable(HistoryRepository.DefaultTableName.ToLowerInvariant())));
					break;
				case "SqlServer":
					services.AddDbContext<LobToolsDbContext>(options => options.UseSqlServer(connectionString)); break;
				default:
					throw new NotImplementedException($"The provider {provider} is not implemented yet.");
			}
		}

		public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseLogger();
		}
	}
}
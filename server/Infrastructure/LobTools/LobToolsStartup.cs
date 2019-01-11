using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.InterfacesTo3rdParty.RichTextDocumentHandling;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.RequestLog;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MiddleWare.Log;
using System;

namespace Brainvest.Dscribe.LobTools
{
	public static class LobToolsStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration, int? defaultAppInstanceId = null)
		{
			services.AddScoped<IRichTextDocumentHandler, RichTextDocumentHandler>();
			services.AddScoped<RequestLogger>();
			services.AddDbContext<LobToolsDbContext>(options =>
			{
				var provider = configuration.GetSection("EfProvider").Get<string>();
				switch (provider)
				{
					case "MySql":
						options.UseMySql(
								configuration.GetConnectionString("DefaultLob"));
						return;
					case "SqlServer":
						options.UseSqlServer(
								configuration.GetConnectionString("DefaultLob"));
						return;
					default:
						throw new NotImplementedException($"The provider {provider} is not implemented yet.");
				}
			});
		}

		public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseLogger();
		}
	}
}
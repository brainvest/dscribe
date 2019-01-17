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
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration
			, Action<DbContextOptionsBuilder, string> efProviderSetup, int? defaultAppInstanceId = null)
		{
			services.AddScoped<IRichTextDocumentHandler, RichTextDocumentHandler>();
			services.AddScoped<RequestLogger>();
			services.AddDbContext<LobToolsDbContext>(options => efProviderSetup(options, "DefaultLob"));
		}

		public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseLogger();
		}
	}
}
namespace Brainvest.Dscribe.LobTools;

using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.InterfacesTo3rdParty.RichTextDocumentHandling;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.RequestLog;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MiddleWare.Log;

public static class LobToolsStartup
{
	public static void ConfigureServices(IServiceCollection services, IConfiguration configuration
		, int? defaultAppInstanceId = null)
	{
		services.AddScoped<IRichTextDocumentHandler, RichTextDocumentHandler>();
		services.AddScoped<RequestLogger>();

		services.RegisterDbContext<LobToolsDbContext>(configuration, "LobTools", "Runtime");
	}

	public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		app.UseLogger();
	}
}

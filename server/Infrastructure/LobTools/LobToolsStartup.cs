using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.InterfacesTo3rdParty.RichTextDocumentHandling;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.LobTools
{
	public static class LobToolsStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration, int? defaultAppInstanceId = null)
		{
			services.AddScoped<IRichTextDocumentHandler, RichTextDocumentHandler>();
		}

		public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{

		}
	}
}
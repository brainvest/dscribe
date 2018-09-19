using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(Brainvest.Dscribe.Identity.Server.Host.Areas.Identity.IdentityHostingStartup))]
namespace Brainvest.Dscribe.Identity.Server.Host.Areas.Identity
{
	public class IdentityHostingStartup : IHostingStartup
	{
		public void Configure(IWebHostBuilder builder)
		{
			builder.ConfigureServices((context, services) =>
			{
			});
		}
	}
}
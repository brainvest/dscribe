using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(Brainvest.Dscribe.Infrastructure.SampleAuthServer.Areas.Identity.IdentityHostingStartup))]
namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Areas.Identity
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
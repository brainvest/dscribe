using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Security
{
	public class SecurityStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
		{
			services.AddDbContext<SecurityDbContext>(options =>
								options.UseSqlServer(
										configuration.GetConnectionString("SecurityConnection")));
			services.AddDefaultIdentity<User>()
					.AddEntityFrameworkStores<SecurityDbContext>();
		}

		public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseAuthentication();
		}
	}
}
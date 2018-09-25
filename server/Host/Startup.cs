using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.Runtime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Brainvest.Dscribe.Host
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options => options.AddPolicy("AllowAll",
				builder =>
				builder
					.AllowAnyMethod()
					.AllowAnyOrigin()
					.AllowAnyHeader()));

			services.AddDbContext<MetadataDbContext>(options =>
					options.UseSqlServer(Configuration.GetConnectionString("EngineConnectionString")));

			RuntimeStartup.ConfigureServices(services, Configuration);

			services.AddMvc().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

			services.AddAuthentication("Bearer")
				.AddIdentityServerAuthentication(options =>
				{
					options.Authority = "http://localhost:5001";
					options.RequireHttpsMetadata = false;
				});
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			app.UseCors("AllowAll");
			RuntimeStartup.Configure(app, env);
			app.UseAuthentication();
			app.UseMvc();
		}
	}
}
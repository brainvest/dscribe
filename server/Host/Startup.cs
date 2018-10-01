using Brainvest.Dscribe.Implementations.EfCore.All;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.Runtime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

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
					{
						var provider = Configuration.GetSection("EfProvider").Get<string>();
						switch (provider)
						{
							case "MySql":
								options.UseMySql(
										Configuration.GetConnectionString("Engine_MySql"));
								return;
							case "SqlServer":
								options.UseSqlServer(
										Configuration.GetConnectionString("Engine_SqlServer"));
								return;
							default:
								throw new NotImplementedException($"The provider {provider} is not implemented yet.");
						}
					});

			RuntimeStartup.ConfigureServices(services, Configuration);
			services.RegisterEfCore();
			services.AddSingleton(new ImplementationResolverOptions
			{
				DefaultAppInstanceId = null
			});

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
			app.UseCors("AllowAll");
			RuntimeStartup.Configure(app, env);
			app.UseAuthentication();
			app.UseMvc();
		}
	}
}
using Brainvest.Dscribe.Implementations.EfCore.All;
using Brainvest.Dscribe.Runtime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
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

			RuntimeStartup.ConfigureServices(services, Configuration, SetupProvider);
			services.RegisterEfCore();

            services.AddControllers(setupAction=> {
            }).AddJsonOptions(jsonOptions =>
            {
                jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

			services.AddAuthentication("Bearer")
					.AddIdentityServerAuthentication(options =>
					{
						options.Authority = Configuration.GetSection("AuthAuthority").Get<string>();
						options.RequireHttpsMetadata = false;
					});
		}

		private void SetupProvider(DbContextOptionsBuilder options, string connectionStringName)
		{
			var provider = Configuration.GetSection("EfProvider").Get<string>();
			switch (provider)  // TODO: use a case-insensitive comparison
			{
				case "MySql":
					options.UseMySql(
							Configuration.GetConnectionString(connectionStringName));
					return;
				case "SqlServer":
					options.UseSqlServer(
							Configuration.GetConnectionString(connectionStringName));
					return;
				case "PostgreSql":
				case "PostgreSQL":
					options.UseNpgsql(
							Configuration.GetConnectionString(connectionStringName));
					return;
				default:
					throw new NotImplementedException($"The provider {provider} is not implemented yet.");
			}
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseCors("AllowAll");
			RuntimeStartup.Configure(app, env);
			app.UseAuthentication();
			app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
		}
	}
}
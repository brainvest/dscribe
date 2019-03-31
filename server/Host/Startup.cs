using Brainvest.Dscribe.Implementations.EfCore.All;
using Brainvest.Dscribe.Runtime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
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

			services.AddMvc()
				.AddJsonOptions(opt => opt.SerializerSettings.ContractResolver = new DefaultContractResolver())
				.SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_2);

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
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
			switch (provider)
			{
				case "MySql":
					options.UseMySql(
							Configuration.GetConnectionString(connectionStringName));
					return;
				case "SqlServer":
					options.UseSqlServer(
							Configuration.GetConnectionString(connectionStringName));
					return;
				default:
					throw new NotImplementedException($"The provider {provider} is not implemented yet.");
			}
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{

			app.UseCors("AllowAll");
			RuntimeStartup.Configure(app, env);
			app.UseSwagger();
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
			});
			app.UseAuthentication();
			app.UseMvc();
		}
	}
}
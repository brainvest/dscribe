using Brainvest.Dscribe.Implementations.EfCore.All;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.Runtime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MiddleWare.Log;
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
			services.AddDbContext<LobToolsDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("LobConnectionString")));


			RuntimeStartup.ConfigureServices(services, Configuration);
			services.RegisterEfCore();

			services.AddMvc()
				.AddJsonOptions(opt => opt.SerializerSettings.ContractResolver = new DefaultContractResolver())
				.SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_2);

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
			app.UseLogger();
			app.UseAuthentication();
			app.UseMvc();
		}
	}
}
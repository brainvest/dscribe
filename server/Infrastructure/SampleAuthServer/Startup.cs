using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Services;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options => options.AddPolicy("AllowAll",
				builder =>
				builder
					.AllowAnyMethod()
					.AllowAnyOrigin()
					.AllowAnyHeader()));


			services.Configure<CookiePolicyOptions>(options =>
			{
				// This lambda determines whether user consent for non-essential cookies is needed for a given request.
				options.CheckConsentNeeded = context => true;
				options.MinimumSameSitePolicy = SameSiteMode.None;
			});

			services.AddDbContext<SecurityDbContext>(options =>
			{
				var provider = Configuration.GetSection("EfProvider").Get<string>();
				switch (provider)
				{
					case "MySql":
						options.UseMySql(
								Configuration.GetConnectionString("Auth_MySql"));
						return;
					case "SqlServer":
						options.UseSqlServer(
								Configuration.GetConnectionString("Auth_SqlServer"));
						return;
					default:
						throw new NotImplementedException($"The provider {provider} is not implemented yet.");
				}
			});
			services.AddIdentity<User, Role>()
					.AddEntityFrameworkStores<SecurityDbContext>()
					.AddDefaultTokenProviders();

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
			services.AddScoped<IEmailSender, FakeEmailSender>();

			var clients = Configuration.GetSection("Clients").Get<IEnumerable<ClientInfo>>();
			services.AddIdentityServer(options =>
			{
				options.UserInteraction.LoginUrl = "/Identity/Account/Login";
				options.UserInteraction.LogoutUrl = "/Identity/Account/Logout";
			})
			 .AddDeveloperSigningCredential()
			 .AddInMemoryPersistedGrants()
			 .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
			 .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
			 .AddInMemoryClients(IdentityServerConfig.GetClients(clients))
			 .AddAspNetIdentity<User>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseDatabaseErrorPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
				app.UseHsts();
			}

			app.UseCors("AllowAll");
			//app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseCookiePolicy();

			app.UseIdentityServer();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
									name: "area_default",
									template: "{area}/{controller=Home}/{action=Index}/{id?}");
				routes.MapRoute(
									name: "default",
									template: "{controller=Home}/{action=Index}/{id?}");
			});
		}
	}
}

using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Services;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options => options.AddPolicy("AllowAll",
				builder =>
				builder
					.AllowAnyMethod()
					.AllowAnyOrigin()
					.AllowAnyHeader()));

			foreach (var pair in Configuration.AsEnumerable())
			{
				Console.WriteLine($"{pair.Key}:{pair.Value}");
			}

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

			services.Configure<ConfigModel>(Configuration.GetSection("Config"));

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

		public void Configure(IApplicationBuilder app, IHostingEnvironment env, IOptions<ConfigModel> options, ILogger<Startup> logger)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseDatabaseErrorPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
			}

			app.UseCors("AllowAll");
			if (!string.IsNullOrWhiteSpace(options.Value.PathBase))
			{
				app.UsePathBase(options.Value.PathBase);
				logger.LogInformation($"Using path {options.Value.PathBase}");
			}
			app.UseStaticFiles();
			app.UseCookiePolicy();

			var forwardedHeaderOptions = new ForwardedHeadersOptions
			{
				ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
			};
			forwardedHeaderOptions.KnownNetworks.Clear();
			forwardedHeaderOptions.KnownProxies.Clear();

			app.UseForwardedHeaders(forwardedHeaderOptions);

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

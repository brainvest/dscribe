using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Services;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Migrations_Auth_MySql;
using Migrations_Auth_PostgreSql;
using Newtonsoft.Json;
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

			var provider = Configuration.GetSection("EfProvider").Get<string>();
			if (string.IsNullOrWhiteSpace(provider))
			{
				Console.WriteLine("Error: database provider is not set, the expected name is: EfProvider");
			}
			var connectionString = Configuration.GetConnectionString("Auth");
			if (string.IsNullOrWhiteSpace(connectionString))
			{
				Console.WriteLine("Error: Connection string is not set, the expected name is: Auth");
			}

			switch (provider)
			{
				case "MySql":
					services.AddDbContext<SecurityDbContext, SecurityDbContext_MySql>(
						options => options.UseMySql(connectionString,
						x => x.MigrationsAssembly(typeof(SecurityDbContext_MySql).Assembly.GetName().Name)
							.MigrationsHistoryTable(HistoryRepository.DefaultTableName.ToLowerInvariant())));
					break;
				case "SqlServer":
					services.AddDbContext<SecurityDbContext>(options => options.UseSqlServer(connectionString));
					break;
				case "PostgreSql":
				case "PostgreSQL":
					services.AddDbContext<SecurityDbContext, SecurityDbContext_PostgreSql>(options => options.UseNpgsql(connectionString));
					break;
				default:
					throw new NotImplementedException($"The provider {provider} is not implemented yet.");
			}

			services.Configure<ConfigModel>(Configuration.GetSection("Config"));
			var config = Configuration.GetSection("Config").Get<ConfigModel>();

			services.AddIdentity<User, Role>(options =>
			{
				options.Password.RequireDigit = config?.Password?.RequireDigit ?? true;
				options.Password.RequireLowercase = config?.Password?.RequireLowercase ?? true;
				options.Password.RequireNonAlphanumeric = config?.Password?.RequireNonAlphanumeric ?? true;
				options.Password.RequireUppercase = config?.Password?.RequireUppercase ?? true;
				options.Password.RequiredLength = config?.Password?.RequiredLength ?? 6;
				options.Password.RequiredUniqueChars = config?.Password?.RequiredUniqueChars ?? 1;
				options.SignIn.RequireConfirmedEmail = config?.SignIn?.RequireConfirmedEmail ?? false;
			})
			.AddEntityFrameworkStores<SecurityDbContext>()
			.AddDefaultTokenProviders();

			if (string.IsNullOrWhiteSpace(config?.Email?.Server))
			{
				services.AddScoped<IEmailSender, FakeEmailSender>();
			}
			else
			{
				services.AddTransient<IEmailSender, SmtpEmailSender>();
			}

			services.Configure<IdentityOptions>(options =>
			{
				options.Password.RequireDigit = config?.Password?.RequireDigit ?? true;
				options.Password.RequireLowercase = config?.Password?.RequireLowercase ?? true;
				options.Password.RequireNonAlphanumeric = config?.Password?.RequireNonAlphanumeric ?? true;
				options.Password.RequireUppercase = config?.Password?.RequireUppercase ?? true;
				options.Password.RequiredLength = config?.Password?.RequiredLength ?? 6;
				options.Password.RequiredUniqueChars = config?.Password?.RequiredUniqueChars ?? 1;
			});

			services.ConfigureApplicationCookie(options =>
				{
					options.Cookie.SameSite = SameSiteMode.None;
				});

			services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
					.AddCookie("Cookies", options =>
			 {
				 options.Cookie.SameSite = SameSiteMode.None;
			 });

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			var clients = Configuration.GetSection("Clients").Get<IEnumerable<ClientInfo>>();
			services.AddSingleton(clients);
			Console.WriteLine();
			Console.WriteLine("Clients");
			Console.WriteLine("==================");
			Console.WriteLine(JsonConvert.SerializeObject(clients));
			Console.WriteLine("==================");

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
			app.UseCookiePolicy(new CookiePolicyOptions
			{
				MinimumSameSitePolicy = SameSiteMode.None
			});

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

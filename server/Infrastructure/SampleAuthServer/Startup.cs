namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer;

using System;
using System.Collections.Generic;
using Brainvest.Dscribe.Helpers;
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
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

public class Startup(IConfiguration configuration)
{
	// TODO: #Security: This needs a complete review. Some of the configuration should be limited to Development environment only.
	public void ConfigureServices(IServiceCollection services)
	{
		// TODO: #Security: How to limit this to Development environment only? Is there any other concern?
		services.AddCors(options => options.AddPolicy("AllowAll",
			builder =>
			builder
				.AllowAnyMethod()
				.AllowAnyOrigin()
				.AllowAnyHeader()));

		services.RegisterDbContext<SecurityDbContext>(configuration, "Auth", "Auth");

		services.Configure<ConfigModel>(configuration.GetSection("Config"));
		var config = configuration.GetSection("Config").Get<ConfigModel>();

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

		// TODO: #Security: SameSite=Lax so the cookies are accepted over plain HTTP when developing locally.
		// Browsers reject "SameSite=None" unless the cookie is also marked "Secure", which requires HTTPS.
		// For production (or any cross-site/embedded usage) this must go back to
		// SameSite=None together with CookieSecurePolicy.Always and be served over HTTPS.
		services.ConfigureApplicationCookie(options =>
			{
				options.Cookie.SameSite = SameSiteMode.Lax;
			});

		services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
				.AddCookie("Cookies", options =>
		 {
			 options.Cookie.SameSite = SameSiteMode.Lax;
		 });

		services.AddRazorPages();

		var clients = configuration.GetSection("Clients").Get<IEnumerable<ClientInfo>>();
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

	public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IOptions<ConfigModel> options, ILogger<Startup> logger)
	{
		if (env.IsDevelopment())
		{
			app.UseDeveloperExceptionPage();
			app.UseMigrationsEndPoint();
			app.UseCors("AllowAll");
		}
		else
		{
			app.UseExceptionHandler("/Home/Error");
		}

		if (!string.IsNullOrWhiteSpace(options.Value.PathBase))
		{
			app.UsePathBase(options.Value.PathBase);
			logger.LogInformation($"Using path {options.Value.PathBase}");
		}
		app.UseStaticFiles();
		// TODO: #Security: Lax instead of None for local HTTP development; see the note in ConfigureServices.
		// This also covers cookies we do not configure ourselves, e.g. Identity's "Identity.External".
		app.UseCookiePolicy(new CookiePolicyOptions
		{
			MinimumSameSitePolicy = SameSiteMode.Lax
		});

		var forwardedHeaderOptions = new ForwardedHeadersOptions
		{
			ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
		};
		forwardedHeaderOptions.KnownIPNetworks.Clear();
		forwardedHeaderOptions.KnownProxies.Clear();

		app.UseForwardedHeaders(forwardedHeaderOptions);

		app.UseRouting();

		app.UseIdentityServer();

		app.UseAuthentication();
		app.UseAuthorization();

		app.UseEndpoints(endpoints =>
		{
			endpoints.MapRazorPages();
			// endpoints.MapControllerRoute(
			// 	name: "area_default",
			// 	pattern: "{area}/{controller=Home}/{action=Index}/{id?}");

			endpoints.MapControllerRoute(
				name: "default",
				pattern: "{controller=Home}/{action=Index}/{id?}");
		});
	}
}

namespace Brainvest.Dscribe.Host;

using System;
using Brainvest.Dscribe.Implementations.EfCore.All;
using Brainvest.Dscribe.Runtime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class Startup(IConfiguration configuration)
{
	public void ConfigureServices(IServiceCollection services)
	{
		services.AddCors(options => options.AddPolicy("AllowAll",
			builder =>
			builder
				.AllowAnyMethod()
				.AllowAnyOrigin()
				.AllowAnyHeader()));

		RuntimeStartup.ConfigureServices(services, configuration);
		services.RegisterEfCore();

		services.AddControllers()
		.AddNewtonsoftJson(options =>
		{
			options.UseMemberCasing();
		})
		.AddJsonOptions(jsonOptions =>
		{
			jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
		});

		var authAuthority = configuration["AuthAuthority"];
		if (string.IsNullOrWhiteSpace(authAuthority))
		{
			throw new InvalidOperationException(
				"The \"AuthAuthority\" setting is missing. Without it no bearer token can be validated"
				+ " and every request stays anonymous. Set it to the auth server's base url, e.g. http://localhost:5001");
		}

		services.AddAuthentication("Bearer")
				.AddJwtBearer(options =>
				{
					options.Authority = authAuthority;
					options.RequireHttpsMetadata = false;
					options.TokenValidationParameters.ValidateAudience = false;
				});
	}

	public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		if (env.IsDevelopment())
		{
			app.UseCors("AllowAll");
		}
		RuntimeStartup.Configure(app, env);
		app.UseRouting();
		app.UseAuthentication();
		app.UseAuthorization();
		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}

namespace Brainvest.Dscribe.Host;

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

		services.AddAuthentication("Bearer")
				.AddJwtBearer(options =>
				{
					options.Authority = configuration.GetSection("AuthAuthority").Get<string>();
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
		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}

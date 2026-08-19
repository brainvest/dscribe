namespace Brainvest.Dscribe.Host;

using Brainvest.Dscribe.Implementations.EfCore.All;
using Brainvest.Dscribe.Runtime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public class Startup(IConfiguration configuration)
{
	public void ConfigureServices(IServiceCollection services)
	{
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
		RuntimeStartup.Configure(app, env);
		app.UseRouting();
		app.UseAuthentication();
		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}

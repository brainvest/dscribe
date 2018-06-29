using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.Implementations.Ef.BusinessDataAccess;
using Brainvest.Dscribe.Implementations.Ef.CodeGenerator;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Runtime
{
	public class RuntimeStartup
	{
		public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
		{
			services.AddMultitenancy<IImplementationsContainer, ImplementationResolver>();

			services.AddScoped<IEntityValidator, EntityValidator>();
			services.AddScoped<IEntityHandler, EFEntityHandler>();
			services.AddScoped<EFEntityHandlerInternal, EFEntityHandlerInternal>();
			services.AddTransient<IBusinessCodeGenerator, EFCodeGenerator>();
			services.AddTransient<IBusinessCompiler, EFCompiler>();
			services.AddScoped<EntityHelper, EntityHelper>();
			services.Configure<IGlobalConfiguration>(configuration.GetSection(nameof(GlobalConfiguration)));
		}

		public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseMultitenancy<IImplementationsContainer>();
		}
	}
}
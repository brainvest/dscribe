namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer;

using System;
using System.Threading.Tasks;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class Program
{
	public static async Task Main(string[] args)
	{
		var app = CreateHostBuilder(args).Build();

		if (args.Length > 0 && await new Commands(app, args).RegisterAndHandleCommands())
		{
			return;
		}

		app.Run();
	}

	public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder.UseStartup<Startup>();
					webBuilder.UseUrls("http://*:5001");
				});
}

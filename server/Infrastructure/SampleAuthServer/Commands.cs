namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer;

using System;
using System.CommandLine;
using System.Linq;
using System.Threading.Tasks;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Spectre.Console;

public class Commands(IHost app, string[] args)
{
	Command createUserCommand = new("create-user");
	Argument<string> emailArgument = new("email");

	public async Task<bool> RegisterAndHandleCommands()
	{
		var rootCommand = new RootCommand();


		createUserCommand.Arguments.Add(emailArgument);

		createUserCommand.SetAction(CreateUser);

		rootCommand.Subcommands.Add(createUserCommand);

		if (args.Length == 0)
		{
			return false;
		}

		if (rootCommand.Subcommands.Any(c => c.Name == args[0]))
		{
			await rootCommand.Parse(args).InvokeAsync();
		}
		else
		{
			Console.WriteLine($"Unknown command: {string.Join(" ", args)}");
		}
		return true;
	}

	private async Task CreateUser(ParseResult parseResult)
	{
		var email = parseResult.GetValue(emailArgument)!;

		using var scope = app.Services.CreateScope();

		var userManager =
		scope.ServiceProvider.GetRequiredService<UserManager<User>>();

		if (await userManager.FindByEmailAsync(email) is not null)
		{
			Console.WriteLine($"User with email {email} already exists.");
			return;
		}

		Console.WriteLine("Please enter the password of the user to create:");
		var password = AnsiConsole.Prompt(new TextPrompt<string>("Password:").Secret());


		var user = new User
		{
			UserName = email,
			Email = email,
			EmailConfirmed = true
		};

		await userManager.CreateAsync(user, password);
	}
}

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Services;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;

public class FakeEmailSender : IEmailSender
{
	public async Task SendEmailAsync(string email, string subject, string htmlMessage)
	{
		await Task.CompletedTask;
	}
}

using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Identity.Server.Host.Services
{
	public class FakeEmailSender : IEmailSender
	{
		public async Task SendEmailAsync(string email, string subject, string htmlMessage)
		{
			await Task.CompletedTask;
		}
	}
}
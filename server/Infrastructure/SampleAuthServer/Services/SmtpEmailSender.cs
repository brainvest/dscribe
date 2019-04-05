using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Services
{
	public class SmtpEmailSender : IEmailSender
	{
		private readonly ConfigModel _config;

		public SmtpEmailSender(IOptions<ConfigModel> config)
		{
			_config = config.Value;
		}

		public async Task SendEmailAsync(string email, string subject, string htmlMessage)
		{
			var client = new SmtpClient(_config.Email.Server, _config.Email.Port ?? 25)
			{
				Credentials = new NetworkCredential(_config.Email.Username, _config.Email.Password)
			};
			var msg = new MailMessage
			{
				From = new MailAddress("Joe@contoso.com", "Joe Smith"),
				Subject = subject,
				SubjectEncoding = Encoding.UTF8,
				Body = htmlMessage,
				BodyEncoding = Encoding.UTF8,
				IsBodyHtml = true
			};
			msg.To.Add(new MailAddress(email));
			await client.SendMailAsync(msg);
		}
	}
}

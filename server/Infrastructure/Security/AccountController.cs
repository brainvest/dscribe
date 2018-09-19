using Brainvest.Dscribe.Security.Entities;
using Brainvest.Dscribe.Security.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Security
{
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly SignInManager<User> _signInManager;
		private readonly ILogger _logger;
		private readonly IOptions<AccountOptions> _options;
		private readonly UserManager<User> _userManager;
		private readonly IEmailSender _emailSender;

		public AccountController(
			SignInManager<User> signInManager,
			UserManager<User> userManager,
			ILogger logger,
			IEmailSender emailSender,
			IOptions<AccountOptions> options)
		{
			_signInManager = signInManager;
			_userManager = userManager;
			_logger = logger;
			_emailSender = emailSender;
			_options = options;
		}

		[HttpPost]
		public async Task<ActionResult> Login(LoginRequest request)
		{
			if (!ModelState.IsValid)
			{
				return ValidationProblem();
			}
			var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, request.RememberMe, lockoutOnFailure: true);
			if (result.Succeeded)
			{
				_logger.LogInformation($"User {request.Email} logged in.");
				return Ok();
			}
			if (result.RequiresTwoFactor)
			{
				_logger.LogInformation($"User {request.Email} logged in, step 1.");
				return Ok();
			}
			if (result.IsLockedOut)
			{
				_logger.LogWarning("User account locked out.");
			}
			else
			{
				_logger.LogWarning($"Invalid login attempt for {request.Email}.");
			}
			ModelState.AddModelError(string.Empty, "Invalid login attempt.");
			return ValidationProblem();
		}

		[HttpPost]
		public async Task<ActionResult> Register(RegisterRequest request)
		{
			if (!ModelState.IsValid)
			{
				return ValidationProblem();
			}
			var user = new User { UserName = request.Email, Email = request.Email };
			var result = await _userManager.CreateAsync(user, request.Password);
			if (result.Succeeded)
			{
				_logger.LogInformation("User created a new account with password.");

				var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
				var callbackUrl = Url.Page(
						"/Account/ConfirmEmail",
						pageHandler: null,
						values: new { userId = user.Id, code },
						protocol: Request.Scheme);

				await _emailSender.SendEmailAsync(request.Email, "Confirm your email",
						$"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

				await _signInManager.SignInAsync(user, isPersistent: false);
				return Ok();
			}
			foreach (var error in result.Errors)
			{
				ModelState.AddModelError(string.Empty, error.Description);
			}
			return ValidationProblem();
		}
	}
}
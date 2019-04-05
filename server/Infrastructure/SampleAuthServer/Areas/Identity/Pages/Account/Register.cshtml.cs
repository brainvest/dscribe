using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Areas.Identity.Pages.Account
{
	[AllowAnonymous]
	public class RegisterModel : PageModel
	{
		private readonly SignInManager<User> _signInManager;
		private readonly UserManager<User> _userManager;
		private readonly ILogger<RegisterModel> _logger;
		private readonly IEmailSender _emailSender;
		private readonly IOptions<ConfigModel> _options;

		public RegisterModel(
				UserManager<User> userManager,
				SignInManager<User> signInManager,
				ILogger<RegisterModel> logger,
				IEmailSender emailSender,
				IOptions<ConfigModel> options)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_logger = logger;
			_emailSender = emailSender;
			_options = options;
		}

		[BindProperty]
		public InputModel Input { get; set; }

		public string ReturnUrl { get; set; }

		public class InputModel
		{
			[Required]
			[EmailAddress]
			[Display(Name = "Email")]
			public string Email { get; set; }

			[Required]
			[StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 1)]
			[DataType(DataType.Password)]
			[Display(Name = "Password")]
			public string Password { get; set; }

			[DataType(DataType.Password)]
			[Display(Name = "Confirm password")]
			[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
			public string ConfirmPassword { get; set; }
		}

		public IActionResult OnGet(string returnUrl = null)
		{
			ReturnUrl = returnUrl;
			if (!_options.Value.AllowRegistration)
			{
				return RedirectToAction("Login", "Account", new { Area = "Identity" });
			}
			return Page();
		}

		public async Task<IActionResult> OnPostAsync(string returnUrl = null)
		{
			if (!_options.Value.AllowRegistration)
			{
				return RedirectToAction("Login", "Account", new { Area = "Identity" });
			}
			returnUrl = returnUrl ?? Url.Content("~/");
			if (ModelState.IsValid)
			{
				var user = new User { UserName = Input.Email, Email = Input.Email };
				var result = await _userManager.CreateAsync(user, Input.Password);
				if (result.Succeeded)
				{
					_logger.LogInformation("User created a new account with password.");

					var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
					var callbackUrl = Url.Page(
							"/Account/ConfirmEmail",
							pageHandler: null,
							values: new { userId = user.Id, code = code },
							protocol: Request.Scheme);

					await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
							$"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

					if (!(_options.Value?.SignIn?.RequireConfirmedEmail ?? false))
					{
						await _signInManager.SignInAsync(user, isPersistent: false);
					}
					return LocalRedirect(returnUrl);
				}
				foreach (var error in result.Errors)
				{
					ModelState.AddModelError(string.Empty, error.Description);
				}
			}

			// If we got this far, something failed, redisplay form
			return Page();
		}
	}
}

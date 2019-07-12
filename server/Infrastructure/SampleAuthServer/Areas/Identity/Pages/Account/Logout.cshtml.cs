using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Areas.Identity.Pages.Account
{
	[AllowAnonymous]
	public class LogoutModel : PageModel
	{
		private readonly SignInManager<User> _signInManager;
		private readonly ILogger<LogoutModel> _logger;

		public LogoutModel(SignInManager<User> signInManager, ILogger<LogoutModel> logger)
		{
			_signInManager = signInManager;
			_logger = logger;
		}

		public async Task<IActionResult> OnGet(string returnUrl = null)
		{
			if (_signInManager.IsSignedIn(User))
			{
				await _signInManager.SignOutAsync();
				return RedirectToPage(new { returnUrl = returnUrl });
			}
			if (returnUrl != null)
			{
				return LocalRedirect(returnUrl);
			}
			else
			{
				return Page();
			}
		}

		public async Task<IActionResult> OnPost(string returnUrl = null)
		{
			await _signInManager.SignOutAsync();
			_logger.LogInformation("User logged out.");
			if (returnUrl != null)
			{
				return LocalRedirect(returnUrl);
			}
			else
			{
				return Page();
			}
		}
	}
}
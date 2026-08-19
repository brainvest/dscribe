namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Areas.Identity.Pages.Account.Manage;

using System.Threading.Tasks;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

public class PersonalDataModel(
	UserManager<User> userManager,
	ILogger<PersonalDataModel> logger) : PageModel
{
	private readonly UserManager<User> _userManager = userManager;
	private readonly ILogger<PersonalDataModel> _logger = logger;

	public async Task<IActionResult> OnGet()
	{
		var user = await _userManager.GetUserAsync(User);
		if (user == null)
		{
			return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
		}

		return Page();
	}
}

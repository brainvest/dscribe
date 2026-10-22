namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Controllers;

using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using Brainvest.Dscribe.Security.Entities;
using Duende.IdentityServer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// Direct (non-redirect) sign-in for the SPA. The access token goes back in the response body; the session that
// renews it lives in an HttpOnly, SameSite=Strict cookie scoped to /auth, so script never sees a long-lived secret.
[ApiController]
[Produces("application/json")]
[Route("auth")]
public class AuthController(
	UserManager<User> userManager,
	SignInManager<User> signInManager,
	IIdentityServerTools tools) : ControllerBase
{
	public const string RefreshScheme = "DscribeRefresh";
	private const string ClientId = "dscribe";
	private const int AccessTokenLifetimeSeconds = 300;

	[HttpPost("login")]
	public async Task<ActionResult<TokenResponseModel>> Login(LoginRequestModel request)
	{
		var user = await userManager.FindByNameAsync(request.Username) ?? await userManager.FindByEmailAsync(request.Username);
		if (user == null)
		{
			return Unauthorized();
		}

		var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
		if (result.IsLockedOut || result.IsNotAllowed)
		{
			return StatusCode(StatusCodes.Status403Forbidden);
		}
		if (!result.Succeeded)
		{
			return Unauthorized();
		}
		// CheckPasswordSignInAsync does not enforce two-factor; don't let this endpoint become a way around it.
		if (await userManager.GetTwoFactorEnabledAsync(user))
		{
			return StatusCode(StatusCodes.Status403Forbidden);
		}

		// The principal carries the security stamp, so a password change or "sign out everywhere" ends the session.
		var principal = await signInManager.CreateUserPrincipalAsync(user);
		await HttpContext.SignInAsync(RefreshScheme, principal);

		return new TokenResponseModel { AccessToken = await IssueAccessToken(user) };
	}

	[HttpPost("refresh")]
	public async Task<ActionResult<TokenResponseModel>> Refresh()
	{
		var session = await HttpContext.AuthenticateAsync(RefreshScheme);
		var user = session.Succeeded ? await signInManager.ValidateSecurityStampAsync(session.Principal) : null;
		if (user == null || !await signInManager.CanSignInAsync(user) || await userManager.IsLockedOutAsync(user))
		{
			await HttpContext.SignOutAsync(RefreshScheme);
			return Unauthorized();
		}

		return new TokenResponseModel { AccessToken = await IssueAccessToken(user) };
	}

	[HttpPost("logout")]
	public async Task<IActionResult> Logout()
	{
		await HttpContext.SignOutAsync(RefreshScheme);
		return NoContent();
	}

	private async Task<string> IssueAccessToken(User user)
	{
		var claims = new List<Claim>
		{
			new("sub", user.Id.ToString()),
			new("name", user.UserName ?? user.Email ?? string.Empty),
		};
		claims.AddRange((await userManager.GetRolesAsync(user)).Select(role => new Claim("role", role)));

		return await tools.IssueClientJwtAsync(
			ClientId,
			AccessTokenLifetimeSeconds,
			HttpContext.RequestAborted,
			scopes: ["testapi"],
			additionalClaims: claims);
	}
}

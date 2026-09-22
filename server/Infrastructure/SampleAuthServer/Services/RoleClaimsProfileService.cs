namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Services;

using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Brainvest.Dscribe.Security.Entities;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Identity;

// Always issues the user's AspNetUserRoles as role claims, regardless of which scopes/claim types were requested for the token.
public class RoleClaimsProfileService(UserManager<User> userManager) : IProfileService
{
	public async Task GetProfileDataAsync(ProfileDataRequestContext context, CancellationToken cancellationToken = default)
	{
		// GetSubjectId() only looks for the "sub" claim; the interactive sign-in principal here uses ClaimTypes.NameIdentifier instead, so check both.
		var subjectId = context.Subject.Claims.FirstOrDefault(x => x.Type is "sub" or ClaimTypes.NameIdentifier)?.Value;
		var user = subjectId == null ? null : await userManager.FindByIdAsync(subjectId);
		if (user == null)
		{
			return;
		}
		var roles = await userManager.GetRolesAsync(user);
		context.IssuedClaims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
	}

	public async Task IsActiveAsync(IsActiveContext context, CancellationToken cancellationToken = default)
	{
		var subjectId = context.Subject.Claims.FirstOrDefault(x => x.Type is "sub" or ClaimTypes.NameIdentifier)?.Value;
		var user = subjectId == null ? null : await userManager.FindByIdAsync(subjectId);
		context.IsActive = user != null;
	}
}

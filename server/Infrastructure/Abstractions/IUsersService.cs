using System;
using System.Security.Claims;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IUsersService
	{
		Guid? GetUserId(string externalUserId);
		Guid? GetUserId(ClaimsPrincipal principal);
	}
}
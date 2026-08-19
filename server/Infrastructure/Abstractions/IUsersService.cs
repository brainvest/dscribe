namespace Brainvest.Dscribe.Abstractions;

using System;
using System.Security.Claims;

public interface IUsersService
{
	Guid? GetUserId(string externalUserId);
	Guid? GetUserId(ClaimsPrincipal principal);
}

namespace Brainvest.Dscribe.Abstractions.Models;

using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

public class ActionRequestInfo
{

	private static readonly string[] _anonymousRoles = ["Anonymous"];
	public ActionRequestInfo(
		HttpContext httpContext,
		IImplementationsContainer implementationsContainer,
		string entityTypeName,
		ActionTypeEnum actionType,
		string actionName = null)
	{
		ActionType = actionType;
		ActionName = actionName;
		EntityTypeName = entityTypeName;
		AppTypeId = implementationsContainer.InstanceInfo.AppTypeId;
		AppInstanceId = implementationsContainer.InstanceInfo.AppInstanceId;
		if (!httpContext.User.Identity.IsAuthenticated)
		{
			Roles = _anonymousRoles;
			return;
		}
		// ASP.NET's JWT handler maps "sub" -> ClaimTypes.NameIdentifier and "role" -> ClaimTypes.Role by default, so accept either form regardless of the issuing auth server.
		var subject = httpContext.User.Claims.FirstOrDefault(x => x.Type is "sub" or ClaimTypes.NameIdentifier)?.Value;
		if (!Guid.TryParse(subject, out var userId))
		{
			Roles = _anonymousRoles;
			return;
		}
		UserId = userId;
		Roles = httpContext.User.Claims.Where(x => x.Type is "role" or ClaimTypes.Role).Select(x => x.Value).ToArray();
	}

	public ActionTypeEnum ActionType { get; set; }
	public string ActionName { get; set; }
	public string EntityTypeName { get; set; }
	public int? AppTypeId { get; set; }
	public int? AppInstanceId { get; set; }

	public Guid? UserId { get; set; }
	public string[] Roles { get; set; }
}

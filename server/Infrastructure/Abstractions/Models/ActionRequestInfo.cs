using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace Brainvest.Dscribe.Abstractions.Models
{
	public class ActionRequestInfo
	{

		private static readonly string[] _anonymousRoles = { "Anonymous" };
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
			if (!Guid.TryParse(httpContext.User.Claims.FirstOrDefault(x => x.Type == "sub")?.Value, out var userId))
			{
				Roles = _anonymousRoles;
				return;
			}
			UserId = userId;
			Roles = httpContext.User.Claims.Where(x => x.Type == "role").Select(x => x.Value).ToArray();
		}

		public ActionTypeEnum ActionType { get; set; }
		public string ActionName { get; set; }
		public string EntityTypeName { get; set; }
		public int? AppTypeId { get; set; }
		public int? AppInstanceId { get; set; }

		public Guid? UserId { get; set; }
		public string[] Roles { get; set; }
	}
}
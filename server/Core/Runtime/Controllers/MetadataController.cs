using System.Linq;
using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.Metadata;
using Microsoft.AspNetCore.Mvc;

namespace Brainvest.Dscribe.Runtime.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class MetadataController(IImplementationsContainer implementationsContainer, IPermissionService permissionService) : ControllerBase
	{
		IImplementationsContainer _implementationsContainer = implementationsContainer;
		IPermissionService _permissionService = permissionService;

		[HttpGet]
		public ActionResult<IEntityTypeMetadataModel> GetEntityByName(string entityTypeName)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, null, ActionTypeEnum.GetMetadata)))
			{
				return Unauthorized();
			}
			if (_implementationsContainer.MetadataModel.EntityTypes.TryGetValue(entityTypeName, out var typeInfo))
			{
				return new ActionResult<IEntityTypeMetadataModel>(typeInfo);
			}
			return BadRequest($"Type {entityTypeName} not found");
		}

		[HttpGet]
		public ActionResult<MetadataModel> GetComplete()
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, null, ActionTypeEnum.GetMetadata)))
			{
				return Unauthorized();
			}
			var result = new MetadataModel
			{
				PropertyDefaults = _implementationsContainer.MetadataModel.PropertyDefaults,
				EntityTypes = _implementationsContainer.MetadataModel.EntityTypes.ToDictionary(x => x.Key, x => x.Value as IEntityTypeMetadataModel)
			};
			return result;
		}

		[HttpPost]
		public void ClearCache()
		{
			//MetadataCache.Clear();
			//MetadataModel.Clear();
		}
	}
}

using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.Metadata;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Brainvest.Dscribe.Runtime.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class MetadataController : ControllerBase
	{
		IImplementationsContainer _implementationsContainer;
		IPermissionService _permissionService;

		public MetadataController(IImplementationsContainer implementationsContainer, IPermissionService permissionService)
		{
			_implementationsContainer = implementationsContainer;
			_permissionService = permissionService;
		}

		[HttpGet]
		public ActionResult<IEntityMetadataModel> GetEntityByName(string entityTypeName)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, null, ActionTypeEnum.GetMetadata)))
			{
				return Unauthorized();
			}
			if (_implementationsContainer.MetadataModel.Entities.TryGetValue(entityTypeName, out var typeInfo))
			{
				return new ActionResult<IEntityMetadataModel>(typeInfo);
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
				Entities = _implementationsContainer.MetadataModel.Entities.ToDictionary(x => x.Key, x => x.Value as IEntityMetadataModel)
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
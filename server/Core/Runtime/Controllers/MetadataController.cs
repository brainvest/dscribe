using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.Metadata;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.Controllers
{
	[Authorize]
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class MetadataController : ControllerBase
	{
		IImplementationsContainer _implementationsContainer;

		public MetadataController(IImplementationsContainer implementationsContainer)
		{
			_implementationsContainer = implementationsContainer;
		}

		[HttpGet]
		public ActionResult<IEntityMetadataModel> GetEntityByName(string entityTypeName)
		{
			if (_implementationsContainer.MetadataModel.Entities.TryGetValue(entityTypeName, out var typeInfo))
			{
				return new ActionResult<IEntityMetadataModel>(typeInfo);
			}
			return BadRequest($"Type {entityTypeName} not found");
		}

		[HttpGet]
		public ActionResult<MetadataModel> GetComplete()
		{
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
using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class EntityController : ControllerBase
	{
		private readonly IEntityHandler _entityHandler;
		private readonly IImplementationsContainer _implementationsContainer;
		private readonly IPermissionService _permissionService;

		public EntityController(
			IEntityHandler entityHandler,
			IImplementationsContainer implementationsContainer,
			IPermissionService permissionService)
		{
			_entityHandler = entityHandler;
			_implementationsContainer = implementationsContainer;
			_permissionService = permissionService;
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable>> GetByFilter([FromBody]EntityListRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityTypeName, ActionTypeEnum.Select)))
			{
				return Unauthorized();
			}
			return new ActionResult<IEnumerable>(await _entityHandler.GetByFilter(request));
		}

		[HttpPost]
		public async Task<ActionResult<int?>> CountByFilter([FromBody]EntityListRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityTypeName, ActionTypeEnum.Select)))
			{
				return Unauthorized();
			}
			return await _entityHandler.CountByFilter(request);
		}

		[HttpPost]
		public async Task<ActionResult<int?>> GetGroupCount([FromBody]GrouppedListRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityTypeName, ActionTypeEnum.Select)))
			{
				return Unauthorized();
			}
			return await _entityHandler.GetGroupCount(request);
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable>> GetGroupped([FromBody]GrouppedListRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityTypeName, ActionTypeEnum.Select)))
			{
				return Unauthorized();
			}
			return new ActionResult<IEnumerable>(await _entityHandler.GetGroupped(request));
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<ExpressionValueResponse>>> GetExpressionValue([FromBody]IEnumerable<ExpressionValueRequest> request)
		{
			var tasks = request
				.Where(x => _permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, x.EntityTypeName, ActionTypeEnum.Select)))
				.Select(x => new { x.EntityTypeName, Task = _entityHandler.GetExpressionValue(x) }).ToList();
			var results = new List<ExpressionValueResponse>();
			foreach (var task in tasks)
			{
				results.Add(await task.Task);
			}
			return results;
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<IdAndNameResponse>>> GetIdAndName([FromBody]IEnumerable<IdAndNameRequest> request)
		{
			var tasks = request
				.Where(x => _permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, x.EntityType, ActionTypeEnum.Select)))
				.Select(x => new { x.EntityType, Task = _entityHandler.GetIdAndName(x) }).ToList();
			var results = new List<IdAndNameResponse>();
			foreach (var task in tasks)
			{
				results.Add(new IdAndNameResponse
				{
					EntityType = task.EntityType,
					Names = await task.Task
				});
			}
			return results;
		}

		[HttpPost]
		public async Task<ActionResult<IdAndNameResponse>> GetAutocompleteItems([FromBody]AutocompleteItemsRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityType, ActionTypeEnum.Select)))
			{
				return Unauthorized();
			}
			var result = await _entityHandler.GetAutocomplteItems(request);
			return new IdAndNameResponse
			{
				EntityType = request.EntityType,
				Names = result
			};
		}

		public class AllIdAndNameRequest
		{
			public string EntityType { get; set; }
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<NameResponseItem>>> GetAllIdAndName([FromBody]AllIdAndNameRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityType, ActionTypeEnum.Select)))
			{
				return Unauthorized();
			}
			return new ActionResult<IEnumerable<NameResponseItem>>(await _entityHandler.GetIdAndName(new IdAndNameRequest { EntityType = request.EntityType, Ids = null }));
		}

		[HttpPost]
		public async Task<ActionResult<object>> Add([FromBody]ManageEntityRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityType, ActionTypeEnum.Insert)))
			{
				return Unauthorized();
			}
			return await _entityHandler.Add(request);
		}

		[HttpPost]
		public async Task<ActionResult<object>> Edit([FromBody]ManageEntityRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityType, ActionTypeEnum.Update)))
			{
				return Unauthorized();
			}
			return await _entityHandler.Edit(request);
		}

		[HttpPost]
		public async Task<ActionResult<object>> Delete([FromBody]ManageEntityRequest request)
		{
			if (!_permissionService.IsAllowed(new ActionRequestInfo(HttpContext, _implementationsContainer, request.EntityType, ActionTypeEnum.Delete)))
			{
				return Unauthorized();
			}
			return await _entityHandler.Delete(request);
		}

	}
}

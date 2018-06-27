using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
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
	public class EntityController : ControllerBase
	{
		IEntityHandler _entityHandler;
		public EntityController(IEntityHandler entityHandler)
		{
			_entityHandler = entityHandler;
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable>> GetByFilter([FromBody]EntityListRequest request)
		{
			return new ActionResult<IEnumerable>(await _entityHandler.GetByFilter(request));
		}

		[HttpPost]
		public async Task<ActionResult<int?>> CountByFilter([FromBody]EntityListRequest request)
		{
			return await _entityHandler.CountByFilter(request);
		}

		[HttpPost]
		public async Task<ActionResult<int?>> GetGroupCount([FromBody]GrouppedListRequest request)
		{
			return await _entityHandler.GetGroupCount(request);
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable>> GetGroupped([FromBody]GrouppedListRequest request)
		{
			return new ActionResult<IEnumerable>(await _entityHandler.GetGroupped(request));
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<ExpressionValueResponse>>> GetExpressionValue([FromBody]IEnumerable<ExpressionValueRequest> request)
		{
			var tasks = request.Select(x => new { x.EntityTypeName, Task = _entityHandler.GetExpressionValue(x) }).ToList();
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
			var tasks = request.Select(x => new { x.EntityType, Task = _entityHandler.GetIdAndName(x) }).ToList();
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
			return new ActionResult<IEnumerable<NameResponseItem>>(await _entityHandler.GetIdAndName(new IdAndNameRequest { EntityType = request.EntityType, Ids = null }));
		}

		[HttpPost]
		public async Task<ActionResult<object>> Add([FromBody]ManageEntityRequest request)
		{
			return await _entityHandler.Add(request);
		}

		[HttpPost]
		public async Task<ActionResult<object>> Edit([FromBody]ManageEntityRequest request)
		{
			return await _entityHandler.Edit(request);
		}

		[HttpPost]
		public async Task<ActionResult<object>> Delete([FromBody]ManageEntityRequest request)
		{
			return await _entityHandler.Delete(request);
		}

	}
}

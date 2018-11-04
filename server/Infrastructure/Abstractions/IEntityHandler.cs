using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IEntityHandler
	{
		Task<int> CountByFilter(EntityListRequest request);
		Task<IEnumerable> GetByFilter(EntityListRequest request);
		Task<int?> GetGroupCount(GrouppedListRequest request);
		Task<ExpressionValueResponse> GetExpressionValue(ExpressionValueRequest request);
		Task<IEnumerable> GetGroupped(GrouppedListRequest request);
		Task<IEnumerable<NameResponseItem>> GetIdAndName(IdAndNameRequest request);
		Task<IEnumerable<NameResponseItem>> GetAutocomplteItems(AutocompleteItemsRequest request);
		Task<ActionResult<object>> Edit(ManageEntityRequest request);
		Task<ActionResult<object>> Add(ManageEntityRequest request);
		Task<ActionResult<object>> Delete(ManageEntityRequest request);
	}
}
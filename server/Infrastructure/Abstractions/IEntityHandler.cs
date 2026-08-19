namespace Brainvest.Dscribe.Abstractions;

using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ReadModels;

public interface IEntityHandler
{
	Task<int> CountByFilter(EntityListRequest request);
	Task<IEnumerable> GetByFilter(EntityListRequest request);
	Task<int?> GetGroupCount(GrouppedListRequest request);
	Task<ExpressionValueResponse> GetExpressionValue(ExpressionValueRequest request);
	Task<IEnumerable> GetGroupped(GrouppedListRequest request);
	Task<IEnumerable<NameResponseItem>> GetIdAndName(IdAndNameRequest request);
	Task<IEnumerable<NameResponseItem>> GetAutocomplteItems(AutocompleteItemsRequest request);
	Task<Result<object>> Edit(ManageEntityRequest request, object businessRepository);
	Task<Result<object>> Add(ManageEntityRequest request, object businessRepository, IActionContextInfo actionContext);
	Task<Result<object>> Delete(ManageEntityRequest request, object businessRepository);
	Task<Result> SaveChanges(object businessRepository, string entityTypeName);
}

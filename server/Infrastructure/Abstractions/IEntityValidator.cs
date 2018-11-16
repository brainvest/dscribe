using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IEntityValidator
	{
		ModelStateDictionary Validate<TEntity>(TEntity entity, ActionTypeEnum actionType, IActionContextInfo actionContext);
	}
}
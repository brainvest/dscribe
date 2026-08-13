namespace Brainvest.Dscribe.Abstractions;

using Microsoft.AspNetCore.Mvc.ModelBinding;

public interface IEntityValidator
{
	ModelStateDictionary Validate<TEntity>(TEntity entity, ActionTypeEnum actionType, IActionContextInfo actionContext);
}

using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IEntityValidator
	{
		ModelStateDictionary Validate<TEntity>(TEntity entity, EntityActionType actionType);
	}
}
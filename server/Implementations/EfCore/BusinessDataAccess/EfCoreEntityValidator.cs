using Brainvest.Dscribe.Abstractions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Brainvest.Dscribe.Implementations.EfCore.BusinessDataAccess
{
	public class EfCoreEntityValidator : IEntityValidator
	{
		private IImplementationsContainer _implementationsContainer;

		public EfCoreEntityValidator(IImplementationsContainer implementationsContainer)
		{
			_implementationsContainer = implementationsContainer;
		}

		//TODO: This should get a Model or a dynamic type instead of the Entity. In the current state, validation ignores required non nullable value types.
		public ModelStateDictionary Validate<TEntity>(TEntity entity, ActionTypeEnum actionType, IActionContextInfo actionContext)
		{
			var entityMetadata = _implementationsContainer.Metadata[typeof(TEntity).Name];
			Dictionary<string, IEnumerable<string>> propertyValidationErrors = null;
			foreach (var property in entityMetadata.GetAllProperties())
			{
				if (property.IsExpression)
				{
					continue;
				}
				if (actionContext.ExcludedProperties != null && actionContext.ExcludedProperties.Contains(property.Name))
				{
					continue;
				}
				if (actionContext != null && actionContext.Masters != null &&
					actionContext.Masters.Any(m => m.MasterProperty.InverseProperty == property || m.MasterProperty.InverseProperty?.ForeignKey == property))
				{
					continue;
				}
				if (property.IsRequired())
				{
					var reflectionProperty = typeof(TEntity).GetProperty(property.Name);
					if (reflectionProperty.PropertyType == typeof(bool))
					{
						continue;
					}
					if (reflectionProperty.GetValue(entity) == null || (reflectionProperty.PropertyType.IsValueType && reflectionProperty.GetValue(entity).Equals(Activator.CreateInstance(reflectionProperty.PropertyType))))
					{
						if (propertyValidationErrors == null)
						{
							propertyValidationErrors = new Dictionary<string, IEnumerable<string>>();
						}
						propertyValidationErrors.Add(property.Name, new List<string> { $"The value for {property.Title ?? property.Name} is empty." });
					}
				}
				//Todo: Add more validation logic, like passwords, email addresses, ...
			}
			if (propertyValidationErrors != null)
			{
				var modelState = new ModelStateDictionary();
				foreach (var prop in propertyValidationErrors.Keys)
				{
					foreach (var error in propertyValidationErrors[prop])
					{
						modelState.AddModelError(prop, error);
					}
				}
				return modelState;
			}
			return null;
		}
	}
}
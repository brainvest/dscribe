namespace Brainvest.Dscribe.Abstractions.Models;

using System.Collections.Generic;

public class ManageEntityRequest
{
	public string EntityTypeName { get; set; }
	public object Entity { get; set; }
}

public class ManageEntityRequest<TEntity>(TEntity entity)
{
	public TEntity Entity { get; set; } = entity;
}

public class ManageEntityResponse
{
	public bool Succeeded { get; set; }
	public string ErrorMessage { get; set; }
	public object Entity { get; set; }
	public ValidationResult ValidationResult { get; set; }
}

public class ValidationResult(IEnumerable<string> entityValidationErrors, IDictionary<string, IEnumerable<string>> propertyValidationErrors)
{
	public bool Succeeded { get { return EntityValidationErrors == null && PropertyValidationErrors == null; } }

	public static ValidationResult Success { get; } = new ValidationResult(null, null);
	public IEnumerable<string> EntityValidationErrors { get; private set; } = entityValidationErrors;
	public IDictionary<string, IEnumerable<string>> PropertyValidationErrors { get; private set; } = propertyValidationErrors;
}

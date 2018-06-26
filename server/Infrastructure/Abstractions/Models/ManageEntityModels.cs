using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models
{
	public class ManageEntityRequest
	{
		public string EntityType { get; set; }
		public object Entity { get; set; }
	}

	public class ManageEntityRequest<TEntity>
	{
		public ManageEntityRequest(TEntity entity)
		{
			Entity = entity;
		}
		public TEntity Entity { get; set; }
	}

	public class ManageEntityResponse
	{
		public bool Succeeded { get; set; }
		public string ErrorMessage { get; set; }
		public object Entity { get; set; }
		public ValidationResult ValidationResult { get; set; }
	}

	public class ValidationResult
	{
		public ValidationResult(IEnumerable<string> entityValidationErrors, IDictionary<string, IEnumerable<string>> propertyValidationErrors)
		{
			EntityValidationErrors = entityValidationErrors;
			PropertyValidationErrors = propertyValidationErrors;
		}

		public bool Succeeded { get { return EntityValidationErrors == null && PropertyValidationErrors == null; } }

		public static ValidationResult Success { get; } = new ValidationResult(null, null);
		public IEnumerable<string> EntityValidationErrors { get; private set; }
		public IDictionary<string, IEnumerable<string>> PropertyValidationErrors { get; private set; }
	}
}
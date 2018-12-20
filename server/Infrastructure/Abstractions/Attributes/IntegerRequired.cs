using System.ComponentModel.DataAnnotations;

namespace Brainvest.Dscribe.Abstractions.Attributes
{
	public class IntegerRequiredAttribute : ValidationAttribute
	{
		public IntegerRequiredAttribute()
		{ }

		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			if ((int)value == 0 || (int?)value == null)
			{
				return new ValidationResult(GetErrorMessage(validationContext.DisplayName));
			}
			return ValidationResult.Success;
		}

		private string GetErrorMessage(string fieldName)
		{
			return "The " + fieldName + " field is required.";
		}
	}

}

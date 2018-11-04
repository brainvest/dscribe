using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class ExpressionValueResponse
	{
		public string EntityTypeName { get; set; }
	}

	public class ExpressionValueResponse<TKey> : ExpressionValueResponse
	{
		public Dictionary<string, Dictionary<TKey, object>> PropertyValues { get; set; }
	}
}
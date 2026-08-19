namespace Brainvest.Dscribe.Abstractions.Models.ReadModels;

using System.Collections.Generic;

public class ExpressionValueResponse
{
	public string EntityTypeName { get; set; }
}

public class ExpressionValueResponse<TKey> : ExpressionValueResponse
{
	public Dictionary<string, Dictionary<TKey, object>> PropertyValues { get; set; }
}

namespace Brainvest.Dscribe.Abstractions.Models;

using System.Linq.Expressions;

public class PropertyInfoModel
{
	public int? MetadataPropertyId { get; set; }
	public string Name { get; set; }
	public string Expression { get; set; }
	public LambdaExpression LambdaExpression { get; set; }
}

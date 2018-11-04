using System.Collections.Generic;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IMetadataCache : IEnumerable<IEntityTypeMetadata>
	{
		IEntityTypeMetadata this[string entityTypeName] { get; }
		IEntityTypeMetadata TryGetEntity(string entityTypeName);
		LambdaExpression GetExpression(string definitionIdentifier, IBusinessReflector reflector);
	}
}
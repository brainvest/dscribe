using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IMetadataCache : IEnumerable<IEntityTypeMetadata>
	{
		IEntityTypeMetadata this[string entityTypeName] { get; }
		IEntityTypeMetadata this[int entityTypeId] { get; }
		IEntityTypeMetadata this[Type entityType] { get; }
		IEntityTypeMetadata Get<T>();
		IEntityTypeMetadata TryGetEntity(string entityTypeName);
		LambdaExpression GetExpression(string definitionIdentifier, IBusinessReflector reflector);
	}
}
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IMetadataCache : IEnumerable<IEntityMetadata>
	{
		IEntityMetadata this[string entityTypeName] { get; }
		IEntityMetadata TryGetEntity(string entityTypeName);
		LambdaExpression GetExpression(string definitionIdentifier, IBusinessReflector reflector);
	}
}
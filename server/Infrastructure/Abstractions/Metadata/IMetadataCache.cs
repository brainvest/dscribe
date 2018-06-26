using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IMetadataCache : IEnumerable<IEntityMetadata>
	{
		IEntityMetadata this[string typeName] { get; }
		IEntityMetadata TryGetEntity(string typeName);
		LambdaExpression GetExpression(string definitionIdentifier, IBusinessReflector reflector);
	}
}
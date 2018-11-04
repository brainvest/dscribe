using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IEntityTypeMetadata
	{
		string Name { get; }
		string SchemaName { get; }
		string TableName { get; }
		string DisplayNameProperty { get; }

		IPropertyMetadata GetPrimaryKey();
		IEnumerable<IPropertyMetadata> GetDirectProperties();
		IEnumerable<IPropertyMetadata> GetAllProperties();
		IPropertyMetadata GetProperty(string propertyName);
	}
}
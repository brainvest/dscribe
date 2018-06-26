using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IEntityMetadata
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
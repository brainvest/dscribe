using System;

namespace Brainvest.Dscribe.Metadata
{
	public class PropertyFacet<TData> : MetadataFacet<PropertyMetadata, TData, PropertyGeneralUsageCategoryStruct>
		where TData : IConvertible
	{
		public delegate TData DefaultValueGenerator(PropertyMetadata propertyMetadata);
		private DefaultValueGenerator _defaultValueGenerator;
		public PropertyFacet(string facetName, TData defaultValue, DefaultValueGenerator defaultValueGenrator)
		: base(facetName, defaultValue)
		{
			_defaultValueGenerator = defaultValueGenrator;
		}

		protected override TData GetDefaultValue(PropertyMetadata owner)
		{
			TData data;
			if (_defaultValues != null && _defaultValues.TryGetValue(owner.GeneralBahvior, out data))
			{
				return data;
			}
			if (_defaultValueGenerator != null)
			{
				return _defaultValueGenerator(owner);
			}
			return DefaultValue;
		}
	}
}
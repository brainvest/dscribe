using System;

namespace Brainvest.Dscribe.Metadata
{
	public class PropertyFacet<TData>(string facetName, TData defaultValue, PropertyFacet<TData>.DefaultValueGenerator defaultValueGenrator) : MetadataFacet<PropertyMetadata, TData, PropertyGeneralUsageCategoryStruct>(facetName, defaultValue)
		where TData : IConvertible
	{
		public delegate TData DefaultValueGenerator(PropertyMetadata propertyMetadata);
		private DefaultValueGenerator _defaultValueGenerator = defaultValueGenrator;

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

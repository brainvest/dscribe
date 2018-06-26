using System;

namespace Brainvest.Dscribe.Metadata
{
	public class EntityFacet<TData> : MetadataFacet<EntityMetadata, TData, EntityGeneralUsageCategoryStruct>
		where TData : IConvertible
	{
		public delegate TData DefaultValueGenerator(EntityMetadata entityMetadata);
		private DefaultValueGenerator _defaultValueGenerator;
		internal EntityFacet(string facetName, TData defaultValue, DefaultValueGenerator defaultValueGenerator)
			: base(facetName, defaultValue)
		{
			_defaultValueGenerator = defaultValueGenerator;
		}

		protected override TData GetDefaultValue(EntityMetadata owner)
		{
			if (_defaultValues != null && _defaultValues.TryGetValue(owner.GeneralBehavior, out TData data))
			{
				return data;
			}
			if (_defaultValueGenerator != null)
			{
				return _defaultValueGenerator(owner);
			}
			return base.GetDefaultValue(owner);
		}
	}
}
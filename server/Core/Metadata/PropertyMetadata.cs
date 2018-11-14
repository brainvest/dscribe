using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Metadata
{
	public class PropertyMetadata : FacetOwner, IPropertyMetadata
	{
		public PropertyGeneralUsageCategoryStruct GeneralBahvior { get; private set; }
		public string Name { get; set; }
		public string Title { get; set; }

		public EntityTypeMetadata Owner { get; set; }
		public DataTypes DataType { get; set; }
		public bool IsNullable { get; set; }
		public bool IsExpression { get; set; }
		public string EntityTypeName { get; set; }

		public IPropertyMetadata ForeignKey { get; set; }
		public IPropertyMetadata InverseProperty { get; set; }

		#region Facets
		public static PropertyFacet<bool> HideInInsertFacet { get; private set; }
		public static PropertyFacet<bool> HideInEditFacet { get; private set; }
		public static PropertyFacet<string> FriendlyNameFacet { get; private set; }
		public static PropertyFacet<bool> IsRequiredFacet { get; private set; }
		public static PropertyFacet<bool> ReadOnlyInEditFacet { get; private set; }
		public static Dictionary<int, Facet> _facets { get; private set; } = new Dictionary<int, Facet>();

		private readonly string _expressionDefinitionIdentifier;
		private LambdaExpression _definitionExpression;
		public LambdaExpression GetDefiningExpression(IBusinessReflector reflector)
		{
			if (_definitionExpression != null || _expressionDefinitionIdentifier == null)
			{
				return _definitionExpression;
			}
			_definitionExpression = _cache.GetExpression(_expressionDefinitionIdentifier, reflector);
			return _definitionExpression;
		}

		public static void DefineFacets(IEnumerable<PropertyFacetDefinition> propertyFacetDefinitions)
		{
			HideInInsertFacet = new PropertyFacet<bool>(nameof(HideInInsertFacet), false, null);
			HideInEditFacet = new PropertyFacet<bool>(nameof(HideInEditFacet), false, null);
			FriendlyNameFacet = new PropertyFacet<string>(nameof(FriendlyNameFacet), null, source => source.Name.SmartSeparate());
			IsRequiredFacet = new PropertyFacet<bool>(nameof(IsRequiredFacet), false, source => !source.IsNullable);
			ReadOnlyInEditFacet = new PropertyFacet<bool>(nameof(ReadOnlyInEditFacet), false, null);
			ReflectionHelper.FillFacetsDictionary<PropertyMetadata>(_facets, propertyFacetDefinitions, typeof(PropertyFacet<>));
		}

		private readonly IDataTypeInfo _dataTypeInfo;
		public IDataTypeInfo GetDataType()
		{
			return _dataTypeInfo;
		}

		public bool IsReadOnlyInEdit()
		{
			return GetFacetValue<bool>(ReadOnlyInEditFacet);
		}

		public bool IsRequired()
		{
			return GetFacetValue<bool>(IsRequiredFacet);
		}

		public bool HideInInsert()
		{
			return GetFacetValue(HideInInsertFacet);
		}

		public bool HideInEdit()
		{
			return GetFacetValue(HideInEditFacet);
		}
		#endregion

		private IMetadataCache _cache;
		public PropertyMetadata(IMetadataCache cache, string name, EntityTypeMetadata owner, PropertyGeneralUsageCategoryStruct generalBehavior
			, DataType dataType, bool isNullable, bool isExpression, string title, string expressionDefinitionIdentifier)
		{
			_cache = cache;
			Name = name;
			Title = title;
			GeneralBahvior = generalBehavior;
			_dataTypeInfo = dataType;
			DataType = (DataTypes)dataType.Id;
			IsNullable = isNullable;
			IsExpression = isExpression;
			_expressionDefinitionIdentifier = expressionDefinitionIdentifier;
			owner.AddProperty(this);
			Owner = owner;
		}
	}
}
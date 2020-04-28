using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Abstractions.Models.Metadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Brainvest.Dscribe.Metadata
{
	public class MetadataModel : IMetadataModel
	{
		public Dictionary<string, IPropertyGeneralUsageCategory> PropertyDefaults { get; private set; }
		public IDictionary<string, IEntityTypeMetadataModel> EntityTypes { get; private set; }
		public IDictionary<string, AdditionalBehaviorMetadata> AdditionalBehaviors { get; private set; }

		public MetadataModel(MetadataBundle bundle)
		{
			AdditionalBehaviors = bundle.AdditionalBehaviors.ToDictionary(x => x.Name, 
				x => new AdditionalBehaviorMetadata
				{
					Definition = x.Definition,
					Name = x.Name
				});
			PropertyDefaults = bundle.PropertyFacetDefaultValues
				.GroupBy(x => x.GeneralUsageCategory.Name)
				.Select(x => new PropertyGeneralUsageCategory
				{
					Name = x.Key,
					Defaults = x
						.Select(y => PropertyFacet.Create(y))
						.ToDictionary(y => y.Name, y => y)
				}).ToDictionary(x => x.Name, x => x as IPropertyGeneralUsageCategory);
			EntityTypes = bundle.EntityTypes.Select(x =>
				new EntityMetadata
				{
					Name = x.Name,
					SchemaName = x.SchemaName,
					EntityGeneralUsageCategoryId = x.GeneralUsageCategoryId,
					SingularTitle = x.SingularTitle,
					PluralTitle = x.PluralTitle,
					DisplayNamePath = x.DisplayNamePath,
					CodePath = x.CodePath,
					PrimaryKeyPath = x.Properties?.FirstOrDefault(p => p.GeneralUsageCategoryId == 2)?.Name, //TODO: Unsafe
					Properties = x.Properties?.Select(p =>
				new PropertyMetadata
				{
					Name = p.Name,
					GeneralUsage = p.GeneralUsageCategory.Name,
					DataType = p.DataType.Identifier,
					EntityTypeName = p.DataEntityType?.Name,
					LocalFacets = p.PropertyFacetValues
						?.Select(v => PropertyFacet.Create(v))
						?.ToDictionary(v => v.Name, v => v),
					ForeignKeyName = p.ForeignKeyProperty?.Name,
					InversePropertyName = p.InverseProperty?.Name,
					Title = p.Title,
					IsNullable = p.IsNullable,
					IsExpression = p.IsExpression,
					Behaviors = p.PropertyBehaviors?.Select(x => new PropertyBehaviorMetadata
					{
						BehaviorName = x.AdditionalBehavior.Name,
						Parameters = x.Parameters
					})?.ToList()
				}).ToDictionary(p => p.Name, p => p)
				}).ToDictionary(x => x.Name, x => x as IEntityTypeMetadataModel);
		}

		public abstract class PropertyFacet
		{
			public string Name { get; set; }

			internal static PropertyFacet Create(PropertyFacetDefaultValue y)
			{
				return CreateInternal(y.FacetDefinition.Name, y.DefaultValue, y.FacetDefinition.FacetTypeId);
			}

			private static PropertyFacet CreateInternal(string name, string value, FacetDataType facetType)
			{
				switch (facetType)
				{
					case FacetDataType.Bool:
						return new PropertyFacet<bool>
						{
							Name = name,
							Value = (bool)Convert.ChangeType(value, typeof(bool)) //TODO: Eliminate boxing/unboxing
						};
					case FacetDataType.Int:
						return new PropertyFacet<int>
						{
							Name = name,
							Value = (int)Convert.ChangeType(value, typeof(int)) //TODO: Eliminate boxing/unboxing
						};
					case FacetDataType.String:
						return new PropertyFacet<string>
						{
							Name = name,
							Value = value
						};
					default:
						throw new NotImplementedException($"Face Type {facetType} is not implemented.");
				}
			}

			internal static PropertyFacet Create(PropertyFacetValue y)
			{
				return CreateInternal(y.FacetDefinition.Name, y.Value, y.FacetDefinition.FacetTypeId);
			}
		}

		public class PropertyFacet<TValue> : PropertyFacet
		{
			public TValue Value { get; set; }
		}

		public class PropertyGeneralUsageCategory : IPropertyGeneralUsageCategory
		{
			public string Name { get; set; }
			public Dictionary<string, PropertyFacet> Defaults { get; set; }
		}

		public class PropertyMetadata
		{
			public string Name { get; set; }
			public string GeneralUsage { get; set; }
			public string DataType { get; set; }
			public string EntityTypeName { get; set; }
			public Dictionary<string, PropertyFacet> LocalFacets { get; set; }
			public string InversePropertyName { get; set; }
			public string ForeignKeyName { get; set; }
			public string Title { get; set; }
			public bool IsNullable { get; set; }
			public bool IsExpression { get; set; }
            public IEnumerable<PropertyBehaviorMetadata> Behaviors { get; set; }
        }

		public class PropertyBehaviorMetadata
		{
			public string BehaviorName { get; set; }
			public string Parameters { get; set; }
		}

		public class AdditionalBehaviorMetadata
		{
			public string Name { get; set; }
			public string Definition { get; set; }
		}

		public class EntityMetadata : IEntityTypeMetadataModel
		{
			public string Name { get; set; }
			public string SchemaName { get; set; }
			[JsonIgnore]
			public string CodePath { get; set; }
			[JsonIgnore]
			public string DisplayNamePath { get; set; }
			[JsonIgnore]
			public string PrimaryKeyPath { get; set; }
			public string Code { get { return CodePath; } }
			public string DisplayName { get { return DisplayNamePath; } }
			public string PrimaryKey { get { return PrimaryKeyPath; } }
			public Dictionary<string, PropertyMetadata> Properties { get; set; }
			public string SingularTitle { get; set; }
			public string PluralTitle { get; set; }
			public int EntityGeneralUsageCategoryId { get; set; }
		}
	}
}
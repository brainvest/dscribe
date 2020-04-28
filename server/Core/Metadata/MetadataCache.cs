using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Metadata
{
	public class MetadataCache : IEnumerable<IEntityTypeMetadata>, IMetadataCache
	{
		private static bool _facetsDefined = false;

		private readonly Dictionary<string, EntityTypeMetadata> _entityTypesByName = new Dictionary<string, EntityTypeMetadata>();
		private readonly Dictionary<int, EntityTypeMetadata> _entityTypesById = new Dictionary<int, EntityTypeMetadata>();
		private readonly Dictionary<string, Facet> _propertyFacets = new Dictionary<string, Facet>();
		private readonly Dictionary<string, Facet> _entityFacets = new Dictionary<string, Facet>();
		private readonly Dictionary<string, DataType> _dataTypesByIndetifier;
		private readonly Dictionary<string, ExpressionInfo> _expressions;
		private Dictionary<int, PropertyGeneralUsageCategoryStruct> _propertyGeneralUsageCategories;
		private Dictionary<int, EntityGeneralUsageCategoryStruct> _entityGeneralUsageCategories;

		public MetadataCache(MetadataBundle bundle)
		{
			_dataTypesByIndetifier = bundle.DataTypes.ToDictionary(x => x.Identifier);
			LoadEntityGeneralUsageCategories(bundle);
			LoadPropertyGeneralUsageCategories(bundle);

			if (!_facetsDefined)
			{
				_facetsDefined = true;
				EntityTypeMetadata.DefineFacets(bundle.EntityTypeFacetDefinitions);
				PropertyMetadata.DefineFacets(bundle.PropertyFacetDefinitions);

				foreach (var defaultValue in bundle.PropertyFacetDefaultValues)
				{
					(PropertyMetadata._facets[defaultValue.FacetDefinitionId] as IMetadataFacet<PropertyGeneralUsageCategoryStruct>)
					.AddDefaultValue(GetPropertyGeneralUsageCategory(defaultValue.GeneralUsageCategoryId), defaultValue.DefaultValue);
				}

				foreach (var defaultValue in bundle.EntityTypeFacetDefaultValues)
				{
					(EntityTypeMetadata._facets[defaultValue.GeneralUsageCategoryId] as IMetadataFacet<EntityGeneralUsageCategoryStruct>)
						.AddDefaultValue(GetEntityGeneralUsageCategory(defaultValue.GeneralUsageCategoryId), defaultValue.DefaultValue);
				}
			}

			var map = new Dictionary<int, PropertyMetadata>();

			foreach (var dbEntityMetadata in bundle.EntityTypes)
			{
				var entityTypeMetadata = new EntityTypeMetadata(dbEntityMetadata, null);
				foreach (var dbPropertyMetadata in dbEntityMetadata.Properties ?? Enumerable.Empty<Property>())
				{
					var propertyMetadata = new PropertyMetadata(this, dbPropertyMetadata.Name, entityTypeMetadata, new PropertyGeneralUsageCategoryStruct
					{
						PropertyGeneralUsageCategoryId = dbPropertyMetadata.GeneralUsageCategoryId,
						Name = dbPropertyMetadata.GeneralUsageCategory.Name
					}, dbPropertyMetadata.DataType, dbPropertyMetadata.IsNullable, dbPropertyMetadata.IsExpression, dbPropertyMetadata.Title,
					dbPropertyMetadata.ExpressionDefinition?.Identifier, dbPropertyMetadata.PropertyBehaviors)
					{
						EntityTypeName = dbPropertyMetadata.DataEntityType?.Name
					};
					map.Add(dbPropertyMetadata.Id, propertyMetadata);

					if (dbPropertyMetadata.PropertyFacetValues != null)
					{
						foreach (var facetValue in dbPropertyMetadata.PropertyFacetValues)
						{
							dynamic facet = PropertyMetadata._facets[facetValue.FacetDefinitionId];
							propertyMetadata.SetValue(facet, facetValue.Value);
						}
					}
				}

				if (dbEntityMetadata.FacetValues != null)
				{
					foreach (var facetValue in dbEntityMetadata.FacetValues)
					{
						dynamic facet = EntityTypeMetadata._facets[facetValue.FacetDefinitionId];
						entityTypeMetadata.SetValue(facet, facetValue.Value);
					}
				}

				_entityTypesByName.Add(dbEntityMetadata.Name, entityTypeMetadata);
				_entityTypesById.Add(dbEntityMetadata.Id, entityTypeMetadata);
			}

			foreach (var property in bundle.EntityTypes.Where(x => x.Properties != null).SelectMany(x => x.Properties))
			{
				if (property.ForeignKeyPropertyId.HasValue)
				{
					map[property.Id].ForeignKey = map[property.ForeignKeyPropertyId.Value];
				}
				if (property.InversePropertyId.HasValue)
				{
					map[property.Id].InverseProperty = map[property.InversePropertyId.Value];
				}
			}

			foreach (var entityType in bundle.EntityTypes.Where(x => x.BaseEntityTypeId.HasValue))
			{
				_entityTypesByName[entityType.Name].BaseEntityType = _entityTypesByName[entityType.BaseEntityType.Name];
			}

			_expressions = new Dictionary<string, ExpressionInfo>();
			foreach (var expressionDefiniction in bundle.ExpressionDefinitions)
			{
				_expressions.Add(expressionDefiniction.Identifier, new ExpressionInfo
				{
					MainInputEntityTypeName = expressionDefiniction.MainInputEntityType.Name
				});
			}

			foreach (var body in bundle.ExpressionBodies)
			{
				if (!_expressions.TryGetValue(body.Definition.Identifier, out var info))
				{
					continue;
				}
				info.Format = body.FormatId;
				info.Body = body.Body;
			}
		}

		private void LoadEntityGeneralUsageCategories(MetadataBundle bundle)
		{
			_entityGeneralUsageCategories = bundle.EntityTypeGeneralUsageCategories.ToDictionary
				(
				x => x.Id,
				x => new EntityGeneralUsageCategoryStruct
				{
					EntityGeneralUsageCategoryId = x.Id,
					Name = x.Name
				}
				);
		}

		private void LoadPropertyGeneralUsageCategories(MetadataBundle bundle)
		{
			_propertyGeneralUsageCategories = bundle.PropertyGeneralUsageCategories.ToDictionary
				(
				x => x.Id,
				x => new PropertyGeneralUsageCategoryStruct
				{
					PropertyGeneralUsageCategoryId = x.Id,
					Name = x.Name
				}
				);
		}

		public EntityGeneralUsageCategoryStruct GetEntityGeneralUsageCategory(int id)
		{
			return _entityGeneralUsageCategories[id];
		}

		public PropertyGeneralUsageCategoryStruct GetPropertyGeneralUsageCategory(int id)
		{
			return _propertyGeneralUsageCategories[id];
		}

		public DataType GetDataType(string identifier)
		{
			return _dataTypesByIndetifier[identifier];
		}

		public IEntityTypeMetadata this[string entityTypeName]
		{
			get
			{
				return _entityTypesByName[entityTypeName];
			}
		}

		public IEntityTypeMetadata this[Type entityType]
		{
			get
			{
				return _entityTypesByName[entityType.Name];
			}
		}

		public IEntityTypeMetadata this[int entityTypeId]
		{
			get
			{
				return _entityTypesById[entityTypeId];
			}
		}

		public IEntityTypeMetadata Get<T>()
		{
			return this[typeof(T)];
		}

		public IEnumerator<IEntityTypeMetadata> GetEnumerator()
		{
			foreach (var entity in _entityTypesByName.Values)
			{
				yield return entity;
			}
		}

		IEnumerator IEnumerable.GetEnumerator()
		{
			return this.GetEnumerator();
		}

		public LambdaExpression GetExpression(string definitionIdentifier, IBusinessReflector reflector)
		{
			if (!_expressions.TryGetValue(definitionIdentifier, out var info))
			{
				return null;
			}
			if (info.Format == ExpressionFormatEnum.SimplePath)
			{
				var entityType = reflector.GetType(info.MainInputEntityTypeName);
				var parameter = Expression.Parameter(entityType);
				return ExpressionBuilder.Path(definitionIdentifier, parameter);
			}
			if (info.Format == ExpressionFormatEnum.Json)
			{
				throw new NotImplementedException();
				//var model = JsonConvert.DeserializeObject<ExpressionModel>(info.Body);
				//return model.ToExpression(reflector, null) as LambdaExpression;
			}
			throw new NotImplementedException();
		}

		public IEntityTypeMetadata TryGetEntity(string entityTypeName)
		{
			if (_entityTypesByName.TryGetValue(entityTypeName, out var entity))
			{
				return entity;
			}
			return null;
		}
	}
}
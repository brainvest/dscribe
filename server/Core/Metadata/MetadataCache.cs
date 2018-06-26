using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Helpers;

namespace Brainvest.Dscribe.Metadata
{
	public class MetadataCache : IEnumerable<IEntityMetadata>, IMetadataCache
	{
		private static bool _facetsDefined = false;

		private Dictionary<string, EntityMetadata> _entitiesByName = new Dictionary<string, EntityMetadata>();
		private Dictionary<string, Facet> _propertyFacets = new Dictionary<string, Facet>();
		private Dictionary<string, Facet> _entityFacets = new Dictionary<string, Facet>();
		private Dictionary<int, PropertyGeneralUsageCategoryStruct> _propertyGeneralUsageCategories;
		private Dictionary<int, EntityGeneralUsageCategoryStruct> _entityGeneralUsageCategories;
		private Dictionary<string, DataType> _dataTypesByIndetifier;
		private Dictionary<string, ExpressionInfo> _expressions;

		public MetadataCache(MetadataBundle bundle)
		{
			_dataTypesByIndetifier = bundle.DataTypes.ToDictionary(x => x.Identifier);
			LoadEntityGeneralUsageCategories(bundle);
			LoadPropertyGeneralUsageCategories(bundle);

			if (!_facetsDefined)
			{
				_facetsDefined = true;
				EntityMetadata.DefineFacets(bundle.EntityFacetDefinitions);
				PropertyMetadata.DefineFacets(bundle.PropertyFacetDefinitions);

				foreach (var defaultValue in bundle.PropertyFacetDefaultValues)
				{
					(PropertyMetadata._facets[defaultValue.FacetDefinitionId] as IMetadataFacet<PropertyGeneralUsageCategoryStruct>)
					.AddDefaultValue(GetPropertyGeneralUsageCategory(defaultValue.GeneralUsageCategoryId), defaultValue.DefaultValue);
				}

				foreach (var defaultValue in bundle.EntityFacetDefaultValues)
				{
					(EntityMetadata._facets[defaultValue.GeneralUsageCategoryId] as IMetadataFacet<EntityGeneralUsageCategoryStruct>)
						.AddDefaultValue(GetEntityGeneralUsageCategory(defaultValue.GeneralUsageCategoryId), defaultValue.DefaultValue);
				}
			}

			var map = new Dictionary<int, PropertyMetadata>();

			foreach (var dbEntityMetadata in bundle.Entities)
			{
				var entityMetadata = new EntityMetadata(dbEntityMetadata, null);
				foreach (var dbPropertyMetadata in dbEntityMetadata.Properties ?? Enumerable.Empty<Property>())
				{
					var propertyMetadata = new PropertyMetadata(this, dbPropertyMetadata.Name, entityMetadata, new PropertyGeneralUsageCategoryStruct
					{
						PropertyGeneralUsageCategoryId = dbPropertyMetadata.GeneralUsageCategoryId,
						Name = dbPropertyMetadata.GeneralUsageCategory.Name
					}, dbPropertyMetadata.DataType, dbPropertyMetadata.IsNullable, dbPropertyMetadata.IsExpression, dbPropertyMetadata.Title,
					dbPropertyMetadata.ExpressionDefinition?.Identifier)
					{
						EntityTypeName = dbPropertyMetadata.DataTypeEntity?.Name
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
						dynamic facet = EntityMetadata._facets[facetValue.FacetDefinitionId];
						entityMetadata.SetValue(facet, facetValue.Value);
					}
				}

				_entitiesByName.Add(dbEntityMetadata.Name, entityMetadata);
			}

			foreach (var property in bundle.Entities.Where(x => x.Properties != null).SelectMany(x => x.Properties))
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

			foreach (var entity in bundle.Entities.Where(x => x.BaseEntityId.HasValue))
			{
				_entitiesByName[entity.Name].BaseEntity = _entitiesByName[entity.BaseEntity.Name];
			}

			_expressions = new Dictionary<string, ExpressionInfo>();
			foreach (var expressionDefiniction in bundle.ExpressionDefinitions)
			{
				_expressions.Add(expressionDefiniction.Identifier, new ExpressionInfo
				{
					MainInputEntityName = expressionDefiniction.MainInputEntity.Name
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
			_entityGeneralUsageCategories = bundle.EntityGeneralUsageCategories.ToDictionary
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

		public IEntityMetadata this[string entityName]
		{
			get
			{
				return _entitiesByName[entityName];
			}
		}

		public IEnumerator<IEntityMetadata> GetEnumerator()
		{
			foreach (var entity in _entitiesByName.Values)
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
				var entityType = reflector.GetType(info.MainInputEntityName);
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

		public IEntityMetadata TryGetEntity(string entityName)
		{
			if (_entitiesByName.TryGetValue(entityName, out var entity))
			{
				return entity;
			}
			return null;
		}
	}
}
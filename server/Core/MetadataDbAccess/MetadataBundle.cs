using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.MetadataDbAccess
{
	public class MetadataBundle
	{
		private MetadataBundle() { }

		public static async Task<MetadataBundle> FromDbWithoutNavigations(MetadataDbContext dbContext, int appTypeId, int appInstanceId)
		{
			var dataTypes = await dbContext.DataTypes.AsNoTracking().ToListAsync();
			var entityTypes = await dbContext.EntityTypes.AsNoTracking().Where(x => x.AppTypeId == appTypeId).ToListAsync();
			var entityTypeFacetDefaultValues = await dbContext.EntityTypeFacetDefaultValues.AsNoTracking()
						.Where(x => (x.AppTypeId ?? appTypeId) == appTypeId && (x.AppInstanceId ?? appInstanceId) == appInstanceId).ToListAsync();
			var entityTypeFacetDefinitions = await dbContext.EntityTypeFacetDefinitions.AsNoTracking().ToListAsync();
			var entityTypeFacetValues = await dbContext.EntityTypeFacetValues.AsNoTracking().Where(x => x.EntityType.AppTypeId == appTypeId).ToListAsync();
			var entityTypeGeneralUsageCategories = await dbContext.EntityTypeGeneralUsageCategories.AsNoTracking().ToListAsync();
			var enumTypes = await dbContext.EnumTypes.AsNoTracking().ToListAsync();
			var enumValues = await dbContext.EnumValues.AsNoTracking().ToListAsync();
			var expressionDefinitions = await dbContext.ExpressionDefinitions.AsNoTracking().Where(x => x.AppTypeId == appTypeId).ToListAsync();
			var expressionBodies = await dbContext.ExpressionBodies.AsNoTracking().Where(x => x.Definition.AppTypeId == appTypeId && x.IsActive).ToListAsync();
			var facetTypes = await dbContext.FacetTypes.AsNoTracking().ToListAsync();
			var properties = await dbContext.Properties.AsNoTracking().Where(x => x.OwnerEntityType.AppTypeId == appTypeId).ToListAsync();
			var propertyFacetDefaultValues = await dbContext.PropertyFacetDefaultValues.AsNoTracking()
						.Where(x => (x.AppTypeId ?? appTypeId) == appTypeId && (x.AppInstanceId ?? appInstanceId) == appInstanceId).ToListAsync();
			var propertyFacetDefinitions = await dbContext.PropertyFacetDefinitions.AsNoTracking().ToListAsync();
			var propertyFacetValues = await dbContext.PropertyFacetValues.AsNoTracking().Where(x => x.Property.OwnerEntityType.AppTypeId == appTypeId).ToListAsync();
			var propertyGeneralUsageCategories = await dbContext.PropertyGeneralUsageCategories.AsNoTracking().ToListAsync();

			return new MetadataBundle
			{
				DataTypes = dataTypes,
				EntityTypes = entityTypes,
				EntityTypeFacetDefaultValues = entityTypeFacetDefaultValues,
				EntityTypeFacetDefinitions = entityTypeFacetDefinitions,
				EntityTypeFacetValues = entityTypeFacetValues,
				EntityTypeGeneralUsageCategories = entityTypeGeneralUsageCategories,
				EnumTypes = enumTypes,
				EnumValues = enumValues,
				ExpressionDefinitions = expressionDefinitions,
				ExpressionBodies = expressionBodies,
				FacetTypes = facetTypes,
				Properties = properties,
				PropertyFacetDefaultValues = propertyFacetDefaultValues,
				PropertyFacetDefinitions = propertyFacetDefinitions,
				PropertyFacetValues = propertyFacetValues,
				PropertyGeneralUsageCategories = propertyGeneralUsageCategories
			};
		}

		public void FixupRelationships()
		{
			var entityTypes = EntityTypes.ToDictionary(x => x.Id);
			var dataTypes = DataTypes.ToDictionary(x => x.Id);
			var entityTypeFacetDefaultValues = EntityTypeFacetDefaultValues.ToDictionary(x => x.Id);
			var entityTypeFacetDefinitions = EntityTypeFacetDefinitions.ToDictionary(x => x.Id);
			var entityTypeFacetValues = EntityTypeFacetValues.ToDictionary(x => x.Id);
			var entityTypeGeneralUsageCategories = EntityTypeGeneralUsageCategories.ToDictionary(x => x.Id);
			var enumTypes = EnumTypes.ToDictionary(x => x.Id);
			var enumValues = EnumValues.ToDictionary(x => x.Id);
			var expressionDefinitions = ExpressionDefinitions.ToDictionary(x => x.Id);
			var expressionBodies = ExpressionBodies.ToDictionary(x => x.Id);
			var facetTypes = FacetTypes.ToDictionary(x => x.Id);
			var properties = Properties.ToDictionary(x => x.Id);
			var propertyFacetDefaultValues = PropertyFacetDefaultValues.ToDictionary(x => x.Id);
			var propertyFacetDefinitions = PropertyFacetDefinitions.ToDictionary(x => x.Id);
			var propertyFacetValues = PropertyFacetValues.ToDictionary(x => x.Id);
			var propertyGeneralUsageCategories = PropertyGeneralUsageCategories.ToDictionary(x => x.Id);

			Fixup(PropertyFacetValues, properties, nameof(PropertyFacetValue.PropertyId), nameof(PropertyFacetValue.Property), nameof(Property.PropertyFacetValues));
			Fixup(PropertyFacetValues, propertyFacetDefinitions, nameof(PropertyFacetValue.FacetDefinitionId), nameof(PropertyFacetValue.FacetDefinition));

			Fixup(PropertyFacetDefinitions, facetTypes, nameof(PropertyFacetDefinition.FacetTypeId), nameof(PropertyFacetDefinition.FacetType));
			Fixup(PropertyFacetDefinitions, enumTypes, nameof(PropertyFacetDefinition.EnumTypeId), nameof(PropertyFacetDefinition.EnumType));

			Fixup(PropertyFacetDefaultValues, propertyFacetDefinitions, nameof(PropertyFacetDefaultValue.FacetDefinitionId), nameof(PropertyFacetDefaultValue.FacetDefinition));
			Fixup(PropertyFacetDefaultValues, propertyGeneralUsageCategories, nameof(PropertyFacetDefaultValue.GeneralUsageCategoryId), nameof(PropertyFacetDefaultValue.GeneralUsageCategory));

			Fixup(Properties, entityTypes, nameof(Property.OwnerEntityTypeId), nameof(Property.OwnerEntityType), nameof(EntityType.Properties));
			Fixup(Properties, propertyGeneralUsageCategories, nameof(Property.GeneralUsageCategoryId), nameof(Property.GeneralUsageCategory));
			Fixup(Properties, dataTypes, nameof(Property.DataTypeId), nameof(Property.DataType));
			Fixup(Properties, expressionDefinitions, nameof(Property.ExpressionDefinitionId), nameof(Property.ExpressionDefinition));
			Fixup(Properties, entityTypes, nameof(Property.DataEntityTypeId), nameof(Property.DataEntityType));
			Fixup(Properties, properties, nameof(Property.ForeignKeyPropertyId), nameof(Property.ForeignKeyProperty), nameof(Property.Unused1));
			Fixup(Properties, properties, nameof(Property.InversePropertyId), nameof(Property.InverseProperty), nameof(Property.Unused2));

			Fixup(ExpressionDefinitions, entityTypes, nameof(ExpressionDefinition.MainInputEntityTypeId), nameof(ExpressionDefinition.MainInputEntityType));
			Fixup(ExpressionDefinitions, expressionBodies, nameof(ExpressionDefinition.ActiveBodyId), nameof(ExpressionDefinition.ActiveBody));

			Fixup(ExpressionBodies, expressionDefinitions, nameof(ExpressionBody.DefinitionId), nameof(ExpressionBody.Definition), nameof(ExpressionDefinition.Bodies));

			Fixup(EnumValues, enumTypes, nameof(EnumValue.EnumTypeId), nameof(EnumValue.EnumType), nameof(EnumType.Values));

			Fixup(EntityTypes, entityTypeGeneralUsageCategories, nameof(EntityType.GeneralUsageCategoryId), nameof(EntityType.GeneralUsageCategory));
			Fixup(EntityTypes, entityTypes, nameof(EntityType.BaseEntityTypeId), nameof(EntityType.BaseEntityType));

			Fixup(EntityTypeFacetValues, entityTypes, nameof(EntityTypeFacetValue.EntityTypeId), nameof(EntityTypeFacetValue.EntityType), nameof(EntityType.FacetValues));
			Fixup(EntityTypeFacetValues, entityTypeFacetDefinitions, nameof(EntityTypeFacetValue.FacetDefinitionId), nameof(EntityTypeFacetValue.FacetDefinition));

			Fixup(EntityTypeFacetDefinitions, facetTypes, nameof(EntityTypeFacetDefinition.FacetTypeId), nameof(EntityTypeFacetDefinition.FacetType));
			Fixup(EntityTypeFacetDefinitions, enumTypes, nameof(EntityTypeFacetDefinition.EnumTypeId), nameof(EntityTypeFacetDefinition.EnumType));

			Fixup(EntityTypeFacetDefaultValues, entityTypeFacetDefinitions, nameof(EntityTypeFacetDefaultValue.FacetDefinitionId), nameof(EntityTypeFacetDefaultValue.FacetDefinition));
			Fixup(EntityTypeFacetDefaultValues, entityTypeGeneralUsageCategories, nameof(EntityTypeFacetDefaultValue.GeneralUsageCategoryId), nameof(EntityTypeFacetDefaultValue.GeneralUsageCategory));
		}

		private void Fixup<Entity1, Entity2, Key2>(IEnumerable<Entity1> list, IDictionary<Key2, Entity2> dictionary, string foreignKeyPropertyName, string navigationPropertyName, string listPropertyName = null)
		{
			var fk = typeof(Entity1).GetProperty(foreignKeyPropertyName);
			var nav = typeof(Entity1).GetProperty(navigationPropertyName);
			var inverse = listPropertyName == null ? null : typeof(Entity2).GetProperty(listPropertyName);
			foreach (var first in list)
			{
				var keyObject = fk.GetValue(first);
				if (keyObject == null)
				{
					continue;
				}
				var key = (Key2)keyObject;
				var second = dictionary[key];
				nav.SetValue(first, second);
				if (inverse != null)
				{
					var collection = (ICollection<Entity1>)inverse.GetValue(second);
					if (collection == null)
					{
						collection = new HashSet<Entity1>();
						inverse.SetValue(second, collection);
					}
					collection.Add(first);
				}
			}
		}

		public List<EntityType> EntityTypes { get; set; }
		public List<DataType> DataTypes { get; set; }
		public List<EntityTypeFacetDefaultValue> EntityTypeFacetDefaultValues { get; set; }
		public List<EntityTypeFacetDefinition> EntityTypeFacetDefinitions { get; set; }
		public List<EntityTypeFacetValue> EntityTypeFacetValues { get; set; }
		public List<EntityTypeGeneralUsageCategory> EntityTypeGeneralUsageCategories { get; set; }
		public List<EnumType> EnumTypes { get; set; }
		public List<EnumValue> EnumValues { get; set; }
		public List<ExpressionDefinition> ExpressionDefinitions { get; set; }
		public List<ExpressionBody> ExpressionBodies { get; set; }
		public List<FacetType> FacetTypes { get; set; }
		public List<Property> Properties { get; set; }
		public List<PropertyFacetDefaultValue> PropertyFacetDefaultValues { get; set; }
		public List<PropertyFacetDefinition> PropertyFacetDefinitions { get; set; }
		public List<PropertyFacetValue> PropertyFacetValues { get; set; }
		public List<PropertyGeneralUsageCategory> PropertyGeneralUsageCategories { get; set; }
	}
}
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

		public static async Task<MetadataBundle> FromDbWithoutNavigations(EngineDbContext dbContext, int appTypeId, int appInstanceId)
		{
			var dataTypes = await dbContext.DataTypes.AsNoTracking().ToListAsync();
			var entities = await dbContext.Entities.AsNoTracking().Where(x => x.AppTypeId == appTypeId).ToListAsync();
			var entityFacetDefaultValues = await dbContext.EntityFacetDefaultValues.AsNoTracking()
						.Where(x => (x.AppTypeId ?? appTypeId) == appTypeId && (x.AppInstanceId ?? appInstanceId) == appInstanceId).ToListAsync();
			var entityFacetDefinitions = await dbContext.EntityFacetDefinitions.AsNoTracking().ToListAsync();
			var entityFacetValues = await dbContext.EntityFacetValues.AsNoTracking().Where(x => x.Entity.AppTypeId == appTypeId).ToListAsync();
			var entityGeneralUsageCategories = await dbContext.EntityGeneralUsageCategories.AsNoTracking().ToListAsync();
			var enumTypes = await dbContext.EnumTypes.AsNoTracking().ToListAsync();
			var enumValues = await dbContext.EnumValues.AsNoTracking().ToListAsync();
			var expressionDefinitions = await dbContext.ExpressionDefinitions.AsNoTracking().Where(x => x.AppTypeId == appTypeId).ToListAsync();
			var expressionBodies = await dbContext.ExpressionBodies.AsNoTracking().Where(x => x.Definition.AppTypeId == appTypeId && x.IsActive).ToListAsync();
			var facetTypes = await dbContext.FacetTypes.AsNoTracking().ToListAsync();
			var properties = await dbContext.Properties.AsNoTracking().Where(x => x.Entity.AppTypeId == appTypeId).ToListAsync();
			var propertyFacetDefaultValues = await dbContext.PropertyFacetDefaultValues.AsNoTracking()
						.Where(x => (x.AppTypeId ?? appTypeId) == appTypeId && (x.AppInstanceId ?? appInstanceId) == appInstanceId).ToListAsync();
			var propertyFacetDefinitions = await dbContext.PropertyFacetDefinitions.AsNoTracking().ToListAsync();
			var propertyFacetValues = await dbContext.PropertyFacetValues.AsNoTracking().Where(x => x.Property.Entity.AppTypeId == appTypeId).ToListAsync();
			var propertyGeneralUsageCategories = await dbContext.PropertyGeneralUsageCategories.AsNoTracking().ToListAsync();

			return new MetadataBundle
			{
				DataTypes = dataTypes,
				Entities = entities,
				EntityFacetDefaultValues = entityFacetDefaultValues,
				EntityFacetDefinitions = entityFacetDefinitions,
				EntityFacetValues = entityFacetValues,
				EntityGeneralUsageCategories = entityGeneralUsageCategories,
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
			var entities = Entities.ToDictionary(x => x.Id);
			var dataTypes = DataTypes.ToDictionary(x => x.Id);
			var entityFacetDefaultValues = EntityFacetDefaultValues.ToDictionary(x => x.Id);
			var entityFacetDefinitions = EntityFacetDefinitions.ToDictionary(x => x.Id);
			var entityFacetValues = EntityFacetValues.ToDictionary(x => x.Id);
			var entityGeneralUsageCategories = EntityGeneralUsageCategories.ToDictionary(x => x.Id);
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

			Fixup(Properties, entities, nameof(Property.EntityId), nameof(Property.Entity), nameof(Entity.Properties));
			Fixup(Properties, propertyGeneralUsageCategories, nameof(Property.GeneralUsageCategoryId), nameof(Property.GeneralUsageCategory));
			Fixup(Properties, dataTypes, nameof(Property.DataTypeId), nameof(Property.DataType));
			Fixup(Properties, expressionDefinitions, nameof(Property.ExpressionDefinitionId), nameof(Property.ExpressionDefinition));
			Fixup(Properties, entities, nameof(Property.DataTypeEntityId), nameof(Property.DataTypeEntity));
			Fixup(Properties, properties, nameof(Property.ForeignKeyPropertyId), nameof(Property.ForeignKeyProperty), nameof(Property.Unused1));
			Fixup(Properties, properties, nameof(Property.InversePropertyId), nameof(Property.InverseProperty), nameof(Property.Unused2));

			Fixup(ExpressionDefinitions, entities, nameof(ExpressionDefinition.MainInputEntityId), nameof(ExpressionDefinition.MainInputEntity));
			Fixup(ExpressionDefinitions, expressionBodies, nameof(ExpressionDefinition.ActiveBodyId), nameof(ExpressionDefinition.ActiveBody));

			Fixup(ExpressionBodies, expressionDefinitions, nameof(ExpressionBody.DefinitionId), nameof(ExpressionBody.Definition), nameof(ExpressionDefinition.Bodies));

			Fixup(EnumValues, enumTypes, nameof(EnumValue.EnumTypeId), nameof(EnumValue.EnumType), nameof(EnumType.Values));

			Fixup(Entities, entityGeneralUsageCategories, nameof(Entity.GeneralUsageCategoryId), nameof(Entity.GeneralUsageCategory));
			Fixup(Entities, entities, nameof(Entity.BaseEntityId), nameof(Entity.BaseEntity));

			Fixup(EntityFacetValues, entities, nameof(EntityFacetValue.EntityId), nameof(EntityFacetValue.Entity), nameof(Entity.FacetValues));
			Fixup(EntityFacetValues, entityFacetDefinitions, nameof(EntityFacetValue.FacetDefinitionId), nameof(EntityFacetValue.FacetDefinition));

			Fixup(EntityFacetDefinitions, facetTypes, nameof(EntityFacetDefinition.FacetTypeId), nameof(EntityFacetDefinition.FacetType));
			Fixup(EntityFacetDefinitions, enumTypes, nameof(EntityFacetDefinition.EnumTypeId), nameof(EntityFacetDefinition.EnumType));

			Fixup(EntityFacetDefaultValues, entityFacetDefinitions, nameof(EntityFacetDefaultValue.FacetDefinitionId), nameof(EntityFacetDefaultValue.FacetDefinition));
			Fixup(EntityFacetDefaultValues, entityGeneralUsageCategories, nameof(EntityFacetDefaultValue.GeneralUsageCategoryId), nameof(EntityFacetDefaultValue.GeneralUsageCategory));
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

		public List<Entity> Entities { get; set; }
		public List<DataType> DataTypes { get; set; }
		public List<EntityFacetDefaultValue> EntityFacetDefaultValues { get; set; }
		public List<EntityFacetDefinition> EntityFacetDefinitions { get; set; }
		public List<EntityFacetValue> EntityFacetValues { get; set; }
		public List<EntityGeneralUsageCategory> EntityGeneralUsageCategories { get; set; }
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
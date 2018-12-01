using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Brainvest.Dscribe.Metadata
{
	public class EntityTypeMetadata : FacetOwner, IEntityTypeMetadata
	{
		public EntityGeneralUsageCategoryStruct GeneralBehavior { get; private set; }
		private Dictionary<string, PropertyMetadata> _properties = new Dictionary<string, PropertyMetadata>();
		public int EntityTypeId { get; private set; }
		public string Name { get; private set; }
		public string SchemaName { get; private set; }
		public string SingularTitle { get; private set; }
		public string PluralTitle { get; private set; }
		public string TableName { get; private set; }
		public EntityTypeMetadata BaseEntityType { get; set; }

		public string DisplayNameProperty { get; set; }
		public string CodeProperty { get; set; }

		#region Facets
		public static EntityFacet<bool> NotMappedFacet { get; private set; }
		public static Dictionary<int, Facet> _facets { get; private set; } = new Dictionary<int, Facet>();

		public static void DefineFacets(IEnumerable<EntityTypeFacetDefinition> entityFacetDefinitions)
		{
			NotMappedFacet = new EntityFacet<bool>(nameof(NotMappedFacet), false, null);
			ReflectionHelper.FillFacetsDictionary<EntityTypeMetadata>(_facets, entityFacetDefinitions, typeof(EntityFacet<>));
		}

		public bool NotMapped()
		{
			return GetFacetValue(NotMappedFacet);
		}

		#endregion

		public EntityTypeMetadata(EntityType dbMetadata, EntityTypeMetadata baseEntityType)
		{
			EntityTypeId = dbMetadata.Id;
			Name = dbMetadata.Name;
			SchemaName = dbMetadata.SchemaName;
			SingularTitle = (dbMetadata.SingularTitle) ?? (dbMetadata.Name.SmartSeparate());
			TableName = dbMetadata.TableName;
			DisplayNameProperty = dbMetadata.DisplayNamePath;
			CodeProperty = dbMetadata.CodePath;
			BaseEntityType = baseEntityType;
		}

		public IPropertyMetadata GetProperty(string propertyName)
		{
			if (_properties.TryGetValue(propertyName, out var prop))
			{
				return prop;
			}
			if (BaseEntityType == null)
			{
				return null;
			}
			return BaseEntityType.GetProperty(propertyName);
		}

		public IEnumerable<IPropertyMetadata> GetDirectProperties()
		{
			return _properties.Values.AsEnumerable();
		}

		public IEnumerable<IPropertyMetadata> GetAllProperties()
		{
			if (BaseEntityType == null)
			{
				return GetDirectProperties();
			}
			return BaseEntityType.GetAllProperties().Union(GetDirectProperties());
		}

		internal void AddProperty(PropertyMetadata propertyMetadata)
		{
			_properties.Add(propertyMetadata.Name, propertyMetadata);
		}

		private IPropertyMetadata _primaryKey;
		public IPropertyMetadata GetPrimaryKey()
		{
			if (_primaryKey == null)
			{
				_primaryKey = GetAllProperties().SingleOrDefault(x => (x as PropertyMetadata).GeneralBahvior.PropertyGeneralUsageCategoryId == 2); //TODO: magic value
			}
			return _primaryKey;
		}
	}
}
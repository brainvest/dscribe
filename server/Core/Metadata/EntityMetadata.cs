using System;
using System.Collections.Generic;
using System.Linq;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.MetadataDbAccess.Entities;

namespace Brainvest.Dscribe.Metadata
{
	public class EntityMetadata : FacetOwner, IEntityMetadata
	{
		public EntityGeneralUsageCategoryStruct GeneralBehavior { get; private set; }
		private Dictionary<string, PropertyMetadata> _properties = new Dictionary<string, PropertyMetadata>();
		public string Name { get; private set; }
		public string SchemaName { get; private set; }
		public string SingularTitle { get; private set; }
		public string PluralTitle { get; private set; }
		public string TableName { get; private set; }
		public EntityMetadata BaseEntity { get; set; }

		public string DisplayNameProperty { get; set; }
		public string CodeProperty { get; set; }

		#region Facets
		public static Dictionary<int, Facet> _facets { get; private set; } = new Dictionary<int, Facet>();

		public static void DefineFacets(IEnumerable<EntityFacetDefinition> entityFacetDefinitions)
		{
			ReflectionHelper.FillFacetsDictionary<EntityMetadata>(_facets, entityFacetDefinitions, typeof(EntityFacet<>));
		}

		#endregion

		public EntityMetadata(Entity dbMetadata, EntityMetadata baseEntity)
		{
			Name = dbMetadata.Name;
			SchemaName = dbMetadata.SchemaName;
			SingularTitle = (dbMetadata.SingularTitle) ?? (dbMetadata.Name.SmartSeparate());
			TableName = dbMetadata.TableName;
			DisplayNameProperty = dbMetadata.DisplayNamePath;
			CodeProperty = dbMetadata.CodePath;
			BaseEntity = baseEntity;
		}

		public IPropertyMetadata GetProperty(string propertyName)
		{
			if (_properties.TryGetValue(propertyName, out var prop))
			{
				return prop;
			}
			if (BaseEntity == null)
			{
				return null;
			}
			return BaseEntity.GetProperty(propertyName);
		}

		public IEnumerable<IPropertyMetadata> GetDirectProperties()
		{
			return _properties.Values.AsEnumerable();
		}

		public IEnumerable<IPropertyMetadata> GetAllProperties()
		{
			if (BaseEntity == null)
			{
				return GetDirectProperties();
			}
			return BaseEntity.GetAllProperties().Union(GetDirectProperties());
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
				_primaryKey = GetAllProperties().Single(x => (x as PropertyMetadata).GeneralBahvior.PropertyGeneralUsageCategoryId == 2); //TODO: magic value
			}
			return _primaryKey;
		}
	}
}
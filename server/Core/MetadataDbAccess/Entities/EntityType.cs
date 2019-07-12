using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class EntityType
	{
		public int Id { get; set; }

		public int AppTypeId { get; set; }
		public AppType AppType { get; set; }

		[MaxLength(200)]
		public string Name { get; set; }
		public string TableName { get; set; }
		public string SchemaName { get; set; }
		public string SingularTitle { get; set; }
		public string PluralTitle { get; set; }

		public int GeneralUsageCategoryId { get; set; }
		[ForeignKey(nameof(GeneralUsageCategoryId))]
		public EntityTypeGeneralUsageCategory GeneralUsageCategory { get; set; }

		public int? BaseEntityTypeId { get; set; }
		[ForeignKey(nameof(BaseEntityTypeId))]
		public EntityType BaseEntityType { get; set; }

		public string DisplayNamePath { get; set; }
		public string CodePath { get; set; }

		[InverseProperty(nameof(Property.OwnerEntityType))]
		public ICollection<Property> Properties { get; set; }
		public ICollection<EntityTypeFacetValue> FacetValues { get; set; }
	}
}
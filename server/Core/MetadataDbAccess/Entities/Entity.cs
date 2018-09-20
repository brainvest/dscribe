using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class Entity
	{
		public int Id { get; set; }

		public int AppTypeId { get; set; }
		public AppType AppType { get; set; }

		[Column(TypeName = "varchar(200)")]
		public string Name { get; set; }
		public string TableName { get; set; }
		public string SchemaName { get; set; }
		public string SingularTitle { get; set; }
		public string PluralTitle { get; set; }

		public int GeneralUsageCategoryId { get; set; }
		[ForeignKey(nameof(GeneralUsageCategoryId))]
		public EntityGeneralUsageCategory GeneralUsageCategory { get; set; }

		public int? BaseEntityId { get; set; }
		[ForeignKey(nameof(BaseEntityId))]
		public Entity BaseEntity { get; set; }

		public string DisplayNamePath { get; set; }
		public string CodePath { get; set; }

		[InverseProperty(nameof(Property.Entity))]
		public ICollection<Property> Properties { get; set; }
		public ICollection<EntityFacetValue> FacetValues { get; set; }
	}
}
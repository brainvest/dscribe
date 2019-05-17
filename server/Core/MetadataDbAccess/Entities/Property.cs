using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class Property
	{
		public int Id { get; set; }

		public int OwnerEntityTypeId { get; set; }
		[ForeignKey(nameof(OwnerEntityTypeId))]
		public EntityType OwnerEntityType { get; set; }

		[MaxLength(200)]
		public string Name { get; set; }
		public string Title { get; set; }

		public int GeneralUsageCategoryId { get; set; }
		public virtual PropertyGeneralUsageCategory GeneralUsageCategory { get; set; }

		public DataTypeEnum? DataTypeId { get; set; }
		[ForeignKey(nameof(DataTypeId))]
		public virtual DataType DataType { get; set; }

		public bool IsExpression { get; set; }

		public int? ExpressionDefinitionId { get; set; }
		public ExpressionDefinition ExpressionDefinition { get; set; }

		public int? DataEntityTypeId { get; set; }
		[ForeignKey(nameof(DataEntityTypeId))]
		public EntityType DataEntityType { get; set; }

		public bool IsNullable { get; set; }
		public ICollection<PropertyFacetValue> PropertyFacetValues { get; set; }

		[ForeignKey(nameof(ForeignKeyProperty))]
		public int? ForeignKeyPropertyId { get; set; }
		[ForeignKey(nameof(ForeignKeyPropertyId))]
		public Property ForeignKeyProperty { get; set; }

		[ForeignKey(nameof(InverseProperty))]
		public int? InversePropertyId { get; set; }
		[ForeignKey(nameof(InversePropertyId))]
		public Property InverseProperty { get; set; }

		[InverseProperty(nameof(ForeignKeyProperty))]
		public ICollection<Property> Unused1 { get; set; }
		[InverseProperty(nameof(InverseProperty))]
		public ICollection<Property> Unused2 { get; set; }
	}
}
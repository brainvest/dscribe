using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class ExpressionDefinition
	{
		public int Id { get; set; }

		public int AppTypeId { get; set; }
		[ForeignKey(nameof(AppTypeId))]
		public AppType AppType { get; set; }

		[Required, Column(TypeName = "varchar(200)")]
		public string Identifier { get; set; }
		[Required]
		public string ShortDescription { get; set; }
		public string LongDescription { get; set; }

		public int MainInputEntityTypeId { get; set; }
		[ForeignKey(nameof(MainInputEntityTypeId))]
		public EntityType MainInputEntityType { get; set; }

		[ForeignKey(nameof(ActiveBody))]
		public int? ActiveBodyId { get; set; }
		public ExpressionBody ActiveBody { get; set; }

		[InverseProperty(nameof(ExpressionBody.Definition))]
		public ICollection<ExpressionBody> Bodies { get; set; }
	}
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class ExpressionDefinition
	{
		public int Id { get; set; }

		public int AppTypeId { get; set; }
		[ForeignKey(nameof(AppTypeId))]
		public AppType AppType { get; set; }

		public string Identifier { get; set; }
		public string ShortDescription { get; set; }
		public string LongDescription { get; set; }

		public int MainInputEntityId { get; set; }
		[ForeignKey(nameof(MainInputEntityId))]
		public Entity MainInputEntity { get; set; }

		[ForeignKey(nameof(ActiveBody))]
		public int? ActiveBodyId { get; set; }
		public ExpressionBody ActiveBody { get; set; }

		[InverseProperty(nameof(ExpressionBody.Definition))]
		public ICollection<ExpressionBody> Bodies { get; set; }
	}
}
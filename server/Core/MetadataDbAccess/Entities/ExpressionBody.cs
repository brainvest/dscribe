using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class ExpressionBody
	{
		public int Id { get; set; }

		[ForeignKey(nameof(Definition))]
		public int DefinitionId { get; set; }
		public ExpressionDefinition Definition { get; set; }

		public bool IsActive { get; set; }
		public DateTime CreationTime { get; set; }
		public DateTime? InvalidationTime { get; set; }
		public string Comments { get; set; }

		public ExpressionFormatEnum FormatId { get; set; }
		[ForeignKey(nameof(FormatId))]
		public ExpressionFormat Format { get; set; }

		public string Body { get; set; }
	}
}
using Brainvest.Dscribe.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class ReportDefinition : IRequestReference
	{
		public int Id { get; set; }

		public int EntityTypeId { get; set; }

		public long? RequestLogId { get; set; }

		public ReportFormats ReportFormatId { get; set; }
		[ForeignKey(nameof(ReportFormatId))]
		public ReportFormat Format { get; set; }

		public string Title { get; set; }

		public byte[] Definition { get; set; }
		public string DefinitionUrl { get; set; }
	}
}
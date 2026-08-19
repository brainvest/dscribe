namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Reporting;

using System.ComponentModel.DataAnnotations.Schema;

public class ReportDefinition
{
	public int Id { get; set; }

	public int EntityTypeId { get; set; }
	public EntityType EntityType { get; set; }

	public ReportFormats ReportFormatId { get; set; }
	[ForeignKey(nameof(ReportFormatId))]
	public ReportFormat Format { get; set; }

	public string Title { get; set; }

	public byte[] Definition { get; set; }
	public string DefinitionUrl { get; set; }
}

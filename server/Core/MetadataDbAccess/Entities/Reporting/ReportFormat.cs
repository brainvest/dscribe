namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Reporting
{
	public class ReportFormat
	{
		public ReportFormat Id { get; set; }
		public string Name { get; set; }
		public string Title { get; set; }
	}
}

public enum ReportFormats
{
	RichTextDocument = 1
}
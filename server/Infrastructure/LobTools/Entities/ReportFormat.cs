namespace Brainvest.Dscribe.LobTools.Entities
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
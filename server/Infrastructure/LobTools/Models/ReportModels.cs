namespace Brainvest.Dscribe.LobTools.Models
{
	public class ReportsListResponse
	{
		public string EntityTypeName { get; set; }
		public ReportFormats Format { get; set; }
		public int Id { get; set; }
		public string Title { get; set; }
	}

	public class DownloadReportRequest
	{
		public int ReportDefinitionId { get; set; }
		public int EntityIdentifier { get; set; }
	}

	public class SaveReportAsAttachmentRequest
	{
		public int ReportDefinitionId { get; set; }
		public int EntityIdentifier { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
	}
}
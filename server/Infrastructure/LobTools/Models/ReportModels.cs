namespace Brainvest.Dscribe.LobTools.Models
{
	public class ReportsListResponse
	{
		public int EntityTypeId { get; set; }
		public ReportFormats ReportFormatId { get; set; }
		public int Id { get; set; }
		public string Title { get; set; }
	}

	public class DownloadReportRequest
	{
		public int ReportId { get; set; }
		public int EntityIdentifier { get; internal set; }
	}
}
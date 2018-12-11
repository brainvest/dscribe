using System.Collections.Generic;

namespace Brainvest.Dscribe.LobTools.Models
{
	public class LobSummaryInfo
	{
		public int CommentsCount { get; set; }
		public int AttachmentsCount { get; set; }
	}

	public class LobSummaryResponse
	{
		public string EntityTypeName { get; set; }
		public Dictionary<int, LobSummaryInfo> Summaries { get; set; }
	}

	public class LobSummaryRequest
	{
		public IEnumerable<int> Identifiers { get; set; }
		public string EntityTypeName { get; set; }
	}
}
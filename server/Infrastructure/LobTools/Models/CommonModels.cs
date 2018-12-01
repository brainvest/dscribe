using System.Collections.Generic;

namespace Brainvest.Dscribe.LobTools.Models
{
	public class LobSummaryResponse
	{
		public string EntityTypeName { get; internal set; }
		public Dictionary<int, int> CommentCounts { get; internal set; }
		public Dictionary<int, int> AttachmentCounts { get; internal set; }
	}

	public class LobSummaryRequest
	{
		public IEnumerable<int> Identifiers { get; internal set; }
		public string EntityTypeName { get; internal set; }
	}
}
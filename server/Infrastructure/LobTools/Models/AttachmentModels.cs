using System.Collections.Generic;

namespace Brainvest.Dscribe.LobTools.Models
{
	public class AttachmentsListRequest
	{
		public string EntityTypeName { get; set; }
		public int Identifier { get; set; }
	}

	public class AttachmentsListResponse
	{
		public IEnumerable<Item> Items { get; set; }

		public class Item
		{
			public string Description { get; set; }
			public int EntityTypeId { get; set; }
			public int Id { get; set; }
			public int Identifier { get; set; }
			public bool IsDeleted { get; set; }
			public string Title { get; set; }
			public string Url { get; set; }
			public string FileName { get; set; }
			public long Size { get; set; }
		}
	}

	public class DownloadAttachmentRequest
	{
		public int Id { get; set; }
	}
}
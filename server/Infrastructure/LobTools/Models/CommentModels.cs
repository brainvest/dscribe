using System.Collections.Generic;

namespace Brainvest.Dscribe.LobTools.Models
{
	public class CommentsListRequest
	{
		public string EntityTypeName { get; set; }
		public int Identifier { get; set; }
	}

	public class CommentsListResponse
	{
		public IEnumerable<Item> Items { get; set; }

		public class Item
		{
			public string Description { get; set; }
			public int EntityTypeId { get; set; }
			public int Id { get; set; }
			public int Identifier { get; set; }
			public bool IsDeleted { get; set; }
			public long? RequestLogId { get; set; }
			public string Title { get; set; }
			public string Url { get; set; }
		}
	}

	public class ManageCommentRequest
	{
		public int? Id { get; set; }
		public string EntityTypeName { get; set; }
		public string Description { get; set; }
		public int Identifier { get; set; }
		public string Title { get; set; }
	}

	public class ManageCommentResponse
	{
		public int Id { get; set; }
	}
}

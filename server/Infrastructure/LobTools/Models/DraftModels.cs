using Brainvest.Dscribe.Abstractions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Brainvest.Dscribe.LobTools.Models
{
	public class SaveDraftRequest
	{
		public Guid? Identifier { get; set; }
		public ActionTypeEnum ActionTypeId { get; internal set; }
		public int EntityTypeId { get; internal set; }
		public string JsonData { get; internal set; }
	}

	public class SaveDraftResponse
	{
		public Guid Identifier { get; internal set; }
		public int Version { get; internal set; }
	}

	public class DraftsListRequest
	{
		public int? EntityTypeId { get; set; }
		public ActionTypeEnum? ActionTypeId { get; set; }
		public bool ShowOtherUsersDrafts { get; set; }
		public Guid? OwnerUserId { get; set; }
		public int StartIndex { get; set; }
		[Range(1, 100)]
		public int Count { get; set; }
	}

	public class DraftsListResponse
	{
		public int TotalCount { get; set; }
		public IEnumerable<Item> Items { get; set; }

		public class Item
		{
			public ActionTypeEnum ActionTypeId { get; set; }
			public DateTime CreationTime { get; set; }
			public int EntityTypeId { get; set; }
			public Guid Identifier { get; set; }
			public int Version { get; set; }
			public string JsonData { get; set; }
			public Guid? OwnerUserId { get; set; }
		}
	}

	public class DraftHistoryRequest
	{
		public Guid Identifier { get; set; }
	}

	public class DraftHistoryResponse
	{

	}

	public class RemoveDraftRequest
	{
		public Guid Identifier { get; set; }
	}

	public class RemoveDraftResponse
	{

	}
}
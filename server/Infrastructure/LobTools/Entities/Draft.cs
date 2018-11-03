using Brainvest.Dscribe.Abstractions;
using System;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class Draft
	{
		public Guid Id { get; set; }

		public int EntityTypeId { get; set; }
		public DateTime CreationTime { get; set; }
		public Guid? OwnerUserId { get; set; }

		public Guid Identifier { get; set; }
		public int Version { get; set; }
		public bool IsLastVersion { get; set; }

		public string JsonData { get; set; }
		public ActionTypeEnum ActionTypeId { get; set; }
	}
}
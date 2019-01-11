using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.ManageMetadata;
using System;

namespace Brainvest.Dscribe.LobTools.Models
{
	public class EntityTypeHistoryModel : IHistory
	{
		public EntityTypeModel EntityType { get; set; }
		public DateTime StartTime { get; set; }
		public Guid? UserId { get; set; }
		public double ProcessDuration { get; set; }
		public long LogId { get; set; }
		public string Action { get; set; }
	}
}

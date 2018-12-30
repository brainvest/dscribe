using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ManageMetadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.LobTools.Models
{
	public class EntityTypeHistoryModel : EntityTypeModel, IHistory
	{
		public DateTime StartTime { get; set; }
		public Guid? UserId { get; set; }
		public string ProcessDuration { get; set; }
		public long LogId { get; set; }
	}
}

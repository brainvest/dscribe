using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.AppManagement;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.LobTools.Models.History
{
	public class AppTypeHistoryModel : AppTypeModel, IHistory
	{
		public DateTime StartTime { get; set; }
		public Guid? UserId { get; set; }
		public string ProcessDuration { get; set; }
		public long LogId { get; set; }
	}
}

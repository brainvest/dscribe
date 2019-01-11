using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.AppManagement;
using System;

namespace Brainvest.Dscribe.LobTools.Models.History
{
	public class AppTypeHistoryModel : IHistory
	{
		public AppTypeModel AppType { get; set; }
		public DateTime StartTime { get; set; }
		public Guid? UserId { get; set; }
		public double ProcessDuration { get; set; }
		public long LogId { get; set; }
		public string Action { get; set; }
	}
}

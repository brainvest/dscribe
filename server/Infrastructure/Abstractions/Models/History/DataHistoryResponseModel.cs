using System;

namespace Brainvest.Dscribe.Abstractions.Models.History
{
	public class DataHistoryResponseModel
	{
		public string Data { get; set; }
		public DataRequestAction Action { get; set; }
		public DateTime ActionTime { get; set; }
		public double ProcessDuration { get; set; }
	}
}

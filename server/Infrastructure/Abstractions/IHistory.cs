using System;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IHistory
	{
		string Action { get; set; }
		DateTime StartTime { get; set; }
		Guid? UserId { get; set; }
		double ProcessDuration { get; set; }
		long LogId { get; set; }
	}
}

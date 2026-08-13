namespace Brainvest.Dscribe.Abstractions;

using System;

public interface IHistory
{
	string Action { get; set; }
	DateTime StartTime { get; set; }
	Guid? UserId { get; set; }
	double ProcessDuration { get; set; }
	long LogId { get; set; }
}

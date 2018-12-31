using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IHistory
	{
		string Action { get; set; }
		DateTime StartTime { get; set; }
		Guid? UserId { get; set; }
		string ProcessDuration { get; set; }
		long LogId { get; set; }
	}
}

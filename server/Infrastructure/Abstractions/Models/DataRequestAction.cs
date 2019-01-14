using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Models
{
	public enum DataRequestAction
	{
		Detached = 0,
		Unchanged = 1,
		Deleted = 2,
		Modified = 3,
		Added = 4,
		Listed = 5,
		None = 6
	}
}

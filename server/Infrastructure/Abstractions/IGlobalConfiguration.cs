using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IGlobalConfiguration
	{
		string ImplementationsDirectory { get; }
		string TempDirectory { get; }
	}
}
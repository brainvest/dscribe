using Brainvest.Dscribe.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Runtime
{
	public class GlobalConfiguration : IGlobalConfiguration
	{
		public string ImplementationsDirectory { get; set; }
		public string TempDirectory { get; set; }
	}
}
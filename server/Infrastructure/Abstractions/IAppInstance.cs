using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IAppInstance
	{
		string DataConnectionString { get; }
		string Name { get; }
	}
}
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IInstanceInfo
	{
		int AppInstanceId { get; }
		int AppTypeId { get; }
		string CompositionDirectory { get; }
		string InstanceName { get; }
		string ConnectionString { get; }
		bool MigrateDatabase { get; set; }
	}
}
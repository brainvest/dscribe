using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public class InstanceInfo : IInstanceInfo
	{
		public int AppInstanceId { get; set; }
		public int AppTypeId { get; set; }
		public string InstanceName { get; set; }
		public string ConnectionString { get; set; }
		public bool MigrateDatabase { get; set; }
	}
}
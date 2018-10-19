namespace Brainvest.Dscribe.Abstractions
{
	public class InstanceInfo : IInstanceInfo
	{
		public int AppInstanceId { get; set; }
		public int AppTypeId { get; set; }
		public string InstanceName { get; set; }
		public DatabaseProviderEnum Provider { get; set; }
		public string ConnectionString { get; set; }
		public bool MigrateDatabase { get; set; }
		public string GeneratedCodeNamespace { get; set; }
	}
}
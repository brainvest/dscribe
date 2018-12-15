namespace Brainvest.Dscribe.Abstractions
{
	public class InstanceInfo : IInstanceInfo
	{
		public int AppInstanceId { get; set; }
		public int AppTypeId { get; set; }
		public string InstanceName { get; set; }
		public DatabaseProviderEnum Provider { get; set; }
		public string DataConnectionString { get; set; }
		public string LobConnectionString { get; set; }
		public bool MigrateDatabase { get; set; }
		public string GeneratedCodeNamespace { get; set; }
		public InstanceSettings InstanceSettings { get; set; }
		public string LoadBusinessFromAssemblyName { get; set; }
	}
}
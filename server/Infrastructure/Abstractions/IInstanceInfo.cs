namespace Brainvest.Dscribe.Abstractions
{
	public interface IInstanceInfo
	{
		int AppInstanceId { get; }
		int AppTypeId { get; }
		string InstanceName { get; }
		string DataConnectionString { get; set; }
		string LobConnectionString { get; set; }
		bool MigrateDatabase { get; }
		DatabaseProviderEnum Provider { get; }
		InstanceSettings InstanceSettings { get; }
		string GetDbContextName();
		string GetNamespace();
		int? SortOrder { get; }
	}
}

namespace Brainvest.Dscribe.Abstractions
{
	public interface IInstanceInfo
	{
		int AppInstanceId { get; }
		int AppTypeId { get; }
		string InstanceName { get; }
		string DataConnectionString { get; }
		string LobConnectionString { get; }
		bool MigrateDatabase { get; }
		string GeneratedCodeNamespace { get; }
		DatabaseProviderEnum Provider { get; }
	}
}
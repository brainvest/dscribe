namespace Brainvest.Dscribe.Abstractions
{
	public interface IInstanceInfo
	{
		int AppInstanceId { get; }
		int AppTypeId { get; }
		string InstanceName { get; }
		string ConnectionString { get; }
		bool MigrateDatabase { get; set; }
		string GeneratedCodeNamespace { get; set; }
	}
}
namespace Brainvest.Dscribe.Abstractions
{
	public interface IAppInstance
	{
		string DataConnectionStringTemplateName { get; set; }
		string LobConnectionStringTemplateName { get; set; }
		string MainDatabaseName { get; set; }
		string LobDatabaseName { get; set; }
		string Name { get; }
	}
}

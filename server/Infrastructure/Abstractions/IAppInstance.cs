namespace Brainvest.Dscribe.Abstractions
{
	public interface IAppInstance
	{
		string DataConnectionString { get; }
		string Name { get; }
	}
}
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IDataLogImplementation
	{
		Task SaveDataChanges(object businessRepository,string entityTypeName);
	}
}

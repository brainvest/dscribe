using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IDataLogImplementation
	{
		Task SaveDataChanges(object businessRepository,string entityTypeName);
		Task<List<string>> GetDataHistory(string entityName, string data);
	}
}

using Brainvest.Dscribe.Abstractions.Models.History;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IDataLogImplementation
	{
		Task SaveDataChanges(object businessRepository,string entityTypeName);
		Task<List<DataHistoryResponseModel>> GetDataHistory(string entityName, string data);
	}
}

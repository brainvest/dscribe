namespace Brainvest.Dscribe.Abstractions;

using System.Collections.Generic;
using System.Threading.Tasks;
using Brainvest.Dscribe.Abstractions.Models.History;

public interface IDataLogImplementation
{
	Task SaveDataChanges(object businessRepository, string entityTypeName);
	Task<List<DataHistoryResponseModel>> GetDataHistory(string entityName, string data);
}

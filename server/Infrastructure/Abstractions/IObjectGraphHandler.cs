namespace Brainvest.Dscribe.Abstractions;

using System.Threading.Tasks;
using Brainvest.Dscribe.Abstractions.Models;

public interface IObjectGraphHandler
{
	Task<Result<object>> Add(ManageEntityRequest request);
	Task<Result<object>> Edit(ManageEntityRequest request);
	Task<Result<object>> Delete(ManageEntityRequest request);
}

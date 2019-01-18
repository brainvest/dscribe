using Brainvest.Dscribe.Abstractions.Models;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IObjectGraphHandler
	{
		Task<Result<object>> Add(ManageEntityRequest request);
		Task<Result<object>> Edit(ManageEntityRequest request);
		Task<Result<object>> Delete(ManageEntityRequest request);
	}
}

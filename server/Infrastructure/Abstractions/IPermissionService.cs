using Brainvest.Dscribe.Abstractions.Models;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IPermissionService
	{
		bool IsAllowed(ActionRequestInfo action);
	}
}
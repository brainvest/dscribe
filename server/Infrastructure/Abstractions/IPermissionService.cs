namespace Brainvest.Dscribe.Abstractions;

using Brainvest.Dscribe.Abstractions.Models;

public interface IPermissionService
{
	bool IsAllowed(ActionRequestInfo action);
}

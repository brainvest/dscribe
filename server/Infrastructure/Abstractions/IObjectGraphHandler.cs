using Brainvest.Dscribe.Abstractions.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IObjectGraphHandler
	{
		Task<ActionResult<object>> Add(ManageEntityRequest request);
		Task<ActionResult<object>> Edit(ManageEntityRequest request);
		Task<ActionResult<object>> Delete(ManageEntityRequest request);
	}
}
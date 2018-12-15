using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public interface IOrderRequest
	{
		IEnumerable<SortItem> Order { get; set; }
	}
}
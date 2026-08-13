namespace Brainvest.Dscribe.Abstractions.Models.ReadModels;

using System.Collections.Generic;

public interface IOrderRequest
{
	IEnumerable<SortItem> Order { get; set; }
}

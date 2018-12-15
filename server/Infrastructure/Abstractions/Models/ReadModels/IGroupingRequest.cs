using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public interface IGroupingRequest
	{
		ICollection<GroupItem> GroupBy { get; set; }
		ICollection<AggregationInfo> Aggregations { get; set; }
	}
}
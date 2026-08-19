namespace Brainvest.Dscribe.Abstractions.Models.ReadModels;

using System.Collections.Generic;

public interface IGroupingRequest
{
	ICollection<GroupItem> GroupBy { get; set; }
	ICollection<AggregationInfo> Aggregations { get; set; }
}

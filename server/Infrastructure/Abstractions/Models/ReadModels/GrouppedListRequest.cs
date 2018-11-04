using Brainvest.Dscribe.Abstractions.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class GrouppedListRequest : IHasEntityTypeName, IFilterModel, IOrderRequest, IGroupingRequest, IPageRequest
	{
		public string EntityTypeName { get; set; }
		public FilterNodeModel[] Filters { get; set; }
		public IEnumerable<SortItem> Order { get; set; }
		public ICollection<GroupItem> GroupBy { get; set; }
		public ICollection<AggregationInfo> Aggregations { get; set; }
		public int? StartIndex { get; set; }
		public int? Count { get; set; }
	}

	public class GrouppedListRequest<TEntity> : IFilterModel<TEntity>, IOrderRequest, IGroupingRequest, IPageRequest
	{
		public Expression<Func<TEntity, bool>>[] Filters { get; set; }
		public IEnumerable<SortItem> Order { get; set; }
		public ICollection<GroupItem> GroupBy { get; set; }
		public ICollection<AggregationInfo> Aggregations { get; set; }
		public int? StartIndex { get; set; }
		public int? Count { get; set; }
	}
}
using Brainvest.Dscribe.Abstractions.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class EntityListRequest : IHasEntityName, IOrderRequest, IPageRequest, IFilterModel
	{
		public string EntityTypeName { get; set; }

		public IEnumerable<SortItem> Order { get; set; }
		public int? StartIndex { get; set; }
		public int? Count { get; set; }
		public FilterNodeModel[] Filters { get; set; }
	}

	public class EntityListRequest<TEntity> : IOrderRequest, IPageRequest, IFilterModel<TEntity>
	{
		public IEnumerable<SortItem> Order { get; set; }
		public int? StartIndex { get; set; }
		public int? Count { get; set; }
		public Expression<Func<TEntity, bool>>[] Filters { get; set; }
	}
}
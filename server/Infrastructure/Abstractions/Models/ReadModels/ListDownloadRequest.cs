using Brainvest.Dscribe.Abstractions.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class ListDownloadRequest : IHasEntityTypeName, IOrderRequest, IFilterModel, IDataDownloadRequest
	{
		public string EntityTypeName { get; set; }

		public IEnumerable<SortItem> Order { get; set; }
		public FilterNodeModel[] Filters { get; set; }
		public DataDownloadFileFormat Format { get; set; }
	}

	public class ListDownloadRequest<TEntity> : IOrderRequest, IFilterModel<TEntity>, IDataDownloadRequest
	{
		public IEnumerable<SortItem> Order { get; set; }
		public Expression<Func<TEntity, bool>>[] Filters { get; set; }
		public DataDownloadFileFormat Format { get; set; }
	}
}
using Brainvest.Dscribe.Abstractions.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public interface IFilterModel
	{
		FilterNodeModel[] Filters { get; set; }
	}

	public interface IFilterModel<TEntity>
	{
		Expression<Func<TEntity, bool>>[] Filters { get; set; }
	}
}
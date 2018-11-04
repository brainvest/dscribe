using Brainvest.Dscribe.Abstractions.Models.Filtering;
using System;
using System.Linq.Expressions;

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
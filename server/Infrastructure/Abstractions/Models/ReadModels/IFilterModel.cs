using System;
using System.Linq.Expressions;
using Brainvest.Dscribe.Abstractions.Models.Filtering;

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
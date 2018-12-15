using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public interface IColumnsRequest
	{
		IEnumerable<string> ColumnNames { get; set; }
	}
}
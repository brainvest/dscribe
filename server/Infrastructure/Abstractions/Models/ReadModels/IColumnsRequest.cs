namespace Brainvest.Dscribe.Abstractions.Models.ReadModels;

using System.Collections.Generic;

public interface IColumnsRequest
{
	IEnumerable<string> ColumnNames { get; set; }
}

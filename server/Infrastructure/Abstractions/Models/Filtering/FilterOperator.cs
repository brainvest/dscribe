using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.Filtering
{
	public enum FilterOperator
	{
		And,
		Or,
		Not,
		Equal,
		NotEqual,
		IsNull,
		IsNotNull,
		LessThan,
		GreaterThan,
		LessThanOrEqual,
		greaterThanOrEqual,
		Between,
		Contains,
		StartsWith,
		EndsWith,
		Add,
		Subtract,
		Multiply,
		Divide,
		Log,
		Power,
		Abs,
		IsEmpty,
		IsNotEmpty,
		Count,
		Sum,
		Average,
		All,
		None,
		Any
	}
}
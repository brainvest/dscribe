using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.Filtering
{
	public enum FilterNodeType
	{
		Logical = 1,
		Comparison,
		Arithmetic,
		Constant,
		NavigationList,
		Lambda,
		Property
	}
}
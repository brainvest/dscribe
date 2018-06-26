using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models
{
	public class PropertyInfoModel
	{
		public int? SemanticPropertyId { get; set; }
		public string Name { get; set; }
		public string Expression { get; set; }
		public LambdaExpression LambdaExpression { get; set; }
	}
}
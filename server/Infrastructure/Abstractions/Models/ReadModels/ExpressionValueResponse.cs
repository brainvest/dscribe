using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class ExpressionValueResponse
	{
		public string EntityTypeName { get; set; }
	}

	public class ExpressionValueResponse<TKey> : ExpressionValueResponse
	{
		public Dictionary<string, Dictionary<TKey, object>> PropertyValues { get; set; }
	}
}
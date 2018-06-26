using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class AggregationInfo
	{
		public string SourcePropertyName { get; set; }
		public SimpleAggregate Aggregate { get; set; }
		public string ResultName { get; set; }
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class IdAndNameRequest
	{
		public string EntityType { get; set; }
		public int[] Ids { get; set; } //TODO: This might not be int[]
	}
}
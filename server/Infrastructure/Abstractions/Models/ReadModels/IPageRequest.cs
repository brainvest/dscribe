using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public interface IPageRequest
	{
		int? StartIndex { get; set; }
		int? Count { get; set; }
	}
}
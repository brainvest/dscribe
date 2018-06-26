using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models
{
	public interface IHasEntityName
	{
		string EntityTypeName { get; set; }
	}
}
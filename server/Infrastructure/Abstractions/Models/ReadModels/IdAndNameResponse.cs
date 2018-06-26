using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class IdAndNameResponse
	{
		public string EntityType { get; set; }
		public IEnumerable<NameResponseItem> Names { get; set; }
	}

	public abstract class NameResponseItem
	{
		public string DisplayName { get; set; }
	}

	public class IdAndNameResponseItem<TId> : NameResponseItem
	{
		public TId Id { get; set; }
	}
}
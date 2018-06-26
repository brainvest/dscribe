using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class SavedFilter
	{
		public int Id { get; set; }

		public int InputEntityId { get; set; }
		[ForeignKey(nameof(InputEntityId))]
		public Entity InputEntity { get; set; }

		public string Title { get; set; }
		public string Body { get; set; }

		public int? UserId { get; set; }
	}
}
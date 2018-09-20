using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class SavedFilter
	{
		public int Id { get; set; }

		public int InputEntityId { get; set; }
		[ForeignKey(nameof(InputEntityId))]
		public Entity InputEntity { get; set; }

		[Required]
		public string Title { get; set; }
		[Required]
		public string Body { get; set; }

		public int? UserId { get; set; }
	}
}
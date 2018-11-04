using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class SavedFilter
	{
		public int Id { get; set; }

		public int InputEntityTypeId { get; set; }
		[ForeignKey(nameof(InputEntityTypeId))]
		public EntityType InputEntityType { get; set; }

		[Required]
		public string Title { get; set; }
		[Required]
		public string Body { get; set; }

		public int? UserId { get; set; }
	}
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class AppType
	{
		public int Id { get; set; }
		[Required, Column(TypeName = "nvarchar(200)")]
		public string Name { get; set; }
		[Required, MaxLength(200)]
		public string Title { get; set; }
	}
}
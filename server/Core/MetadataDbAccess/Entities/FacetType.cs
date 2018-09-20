using Brainvest.Dscribe.Abstractions.Metadata;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class FacetType
	{
		public FacetDataType Id { get; set; }
		public string Name { get; set; }
		[Column(TypeName = "varchar(200)")]
		public string Identifier { get; set; }
	}
}
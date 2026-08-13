using System.ComponentModel.DataAnnotations;
using Brainvest.Dscribe.Abstractions.Metadata;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class FacetType
	{
		public FacetDataType Id { get; set; }
		public string Name { get; set; }
		[MaxLength(200)]
		public string Identifier { get; set; }
	}
}
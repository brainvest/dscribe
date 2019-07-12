using Brainvest.Dscribe.Abstractions.Metadata;
using System.ComponentModel.DataAnnotations;

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
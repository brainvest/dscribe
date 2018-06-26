using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class PropertyFacetValue
	{
		public int Id { get; set; }

		public int PropertyId { get; set; }
		public Property Property { get; set; }

		public int FacetDefinitionId { get; set; }
		[ForeignKey(nameof(FacetDefinitionId))]
		public PropertyFacetDefinition FacetDefinition { get; set; }

		public string Value { get; set; }
	}
}
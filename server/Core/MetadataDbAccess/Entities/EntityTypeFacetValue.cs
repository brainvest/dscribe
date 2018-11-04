using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class EntityTypeFacetValue
	{
		public int Id { get; set; }

		public int EntityTypeId { get; set; }
		public EntityType EntityType { get; set; }

		public int FacetDefinitionId { get; set; }
		[ForeignKey(nameof(FacetDefinitionId))]
		public EntityTypeFacetDefinition FacetDefinition { get; set; }

		public string Value { get; set; }
	}
}
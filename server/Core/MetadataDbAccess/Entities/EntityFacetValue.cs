using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class EntityFacetValue
	{
		public int Id { get; set; }
		public int EntityId { get; set; }
		public Entity Entity { get; set; }

		public int FacetDefinitionId { get; set; }
		[ForeignKey(nameof(FacetDefinitionId))]
		public EntityFacetDefinition FacetDefinition { get; set; }

		public string Value { get; set; }
	}
}
using Brainvest.Dscribe.Abstractions.Metadata;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class PropertyFacetDefinition : IDBFacetDefinition
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public FacetDataType FacetTypeId { get; set; }
		public FacetType FacetType { get; set; }

		public int? EnumTypeId { get; set; }
		public EnumType EnumType { get; set; }
	}
}
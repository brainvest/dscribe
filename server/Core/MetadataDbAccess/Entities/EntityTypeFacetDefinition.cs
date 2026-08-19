namespace Brainvest.Dscribe.MetadataDbAccess.Entities;

using Brainvest.Dscribe.Abstractions.Metadata;

public class EntityTypeFacetDefinition : IDBFacetDefinition
{
	public int Id { get; set; }
	public string Name { get; set; }

	public FacetDataType FacetTypeId { get; set; }
	public FacetType FacetType { get; set; }

	public int? EnumTypeId { get; set; }
	public EnumType EnumType { get; set; }
}

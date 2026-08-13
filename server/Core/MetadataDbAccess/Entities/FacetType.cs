namespace Brainvest.Dscribe.MetadataDbAccess.Entities;

using System.ComponentModel.DataAnnotations;
using Brainvest.Dscribe.Abstractions.Metadata;

public class FacetType
{
	public FacetDataType Id { get; set; }
	public string Name { get; set; }
	[MaxLength(200)]
	public string Identifier { get; set; }
}

namespace Brainvest.Dscribe.MetadataDbAccess.Entities;

using System.ComponentModel.DataAnnotations;

public class AppType
{
	public int Id { get; set; }
	[Required, MaxLength(200)]
	public string Name { get; set; }
	[Required, MaxLength(200)]
	public string Title { get; set; }
}

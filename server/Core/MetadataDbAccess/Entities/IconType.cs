namespace Brainvest.Dscribe.MetadataDbAccess.Entities;

using System.ComponentModel.DataAnnotations;

public class IconType
{
	[Key]
	public IconTypeEnum Id { get; set; }

	[Required]
	public string Name { get; set; }
}

public enum IconTypeEnum
{
	GoogleMaterial,
	FontAwesome,
	RelativePath,
	AbsolutePath,
}

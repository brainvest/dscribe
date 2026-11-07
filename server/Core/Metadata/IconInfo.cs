namespace Brainvest.Dscribe.Metadata;

using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

public class IconInfo
{
	public required string Name { get; set; }
	[JsonConverter(typeof(StringEnumConverter))]
	public required IconTypeEnum Type { get; set; }
	public string Path { get; set; }

	internal static IconInfo FromDb(MetadataDbAccess.Entities.IconInfo dbIcon)
	{
		if (dbIcon == null)
		{
			return null;
		}
		return new IconInfo
		{
			Name = dbIcon.Name,
			Type = dbIcon.IconTypeId,
			Path = dbIcon.Path
		};
	}
}

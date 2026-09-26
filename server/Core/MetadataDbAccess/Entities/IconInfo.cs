namespace Brainvest.Dscribe.MetadataDbAccess.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// An icon, looked up by <see cref="Name"/>. Rows with the same name can exist in several scopes:
/// global (both scope ids null), app type (<see cref="AppTypeId"/> set) and app instance (<see cref="AppInstanceId"/> set).
/// The most specific scope wins.
/// </summary>
public class IconInfo
{
	[Key]
	public int Id { get; set; }

	[Required]
	public IconTypeEnum IconTypeId { get; set; }
	[ForeignKey(nameof(IconTypeId))]
	public IconType IconType { get; set; }

	[Required, MaxLength(200)]
	public string Name { get; set; }

	[Required]
	public string Path { get; set; }

	public int? AppTypeId { get; set; }
	[ForeignKey(nameof(AppTypeId))]
	public AppType AppType { get; set; }

	public int? AppInstanceId { get; set; }
	[ForeignKey(nameof(AppInstanceId))]
	public AppInstance AppInstance { get; set; }
}

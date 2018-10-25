using System;

namespace Brainvest.Dscribe.Abstractions.Models.AppManagement
{
	public class AppInstanceInfoModel
	{
		public int Id { get; set; }
		public int AppTypeId { get; set; }
		public string AppTypeName { get; set; }
		public string AppTypeTitle { get; set; }
		public bool IsEnabled { get; set; }
		public bool IsProduction { get; set; }
		public DateTime? MetadataReleaseReleaseTime { get; set; }
		public string MetadataReleaseVersion { get; set; }
		public int? MetadataReleaseVersionCode { get; set; }
		public string Name { get; set; }
		public string Title { get; set; }
		public bool UseUnreleasedMetadata { get; set; }
		public string GeneratedCodeNamespace { get; set; }
	}
}
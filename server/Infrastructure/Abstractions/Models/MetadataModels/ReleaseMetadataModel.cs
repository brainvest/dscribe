using System.ComponentModel.DataAnnotations;

namespace Brainvest.Dscribe.Abstractions.Models.MetadataModels
{
	public class ReleaseMetadataRequest
	{
		[Required]
		public int? AppInstanceId { get; set; }
		public bool SetAsInstanceMetadata { get; set; }
		public string Version { get; set; }
		public int? VersionCode { get; set; }
	}
}
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Models.MetadataModels
{
	public class ReleaseMetadataRequest
	{
		public int AppInstanceId { get; set; }
		public bool SetAsInstanceMetadata { get; set; }
		public string Version { get; set; }
		public int? VersionCode { get; set; }
	}
}
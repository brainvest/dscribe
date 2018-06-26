using Brainvest.Dscribe.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class MetadataRelease
	{
		public int Id { get; set; }

		public string Version { get; set; }
		public int? VersionCode { get; set; }

		public int AppTypeId { get; set; }
		public AppType AppType { get; set; }

		public DateTime ReleaseTime { get; set; }
		public int CreatedByUserId { get; set; }

		public byte[] MetadataSnapshot { get; set; }

		[NotMapped]
		public string MetadataSnapshotText
		{
			get
			{
				return TextHelper.Unzip(MetadataSnapshot);
			}
			set
			{
				MetadataSnapshot = TextHelper.Zip(value);
			}
		}
	}
}
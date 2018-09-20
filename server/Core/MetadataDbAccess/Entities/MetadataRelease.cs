using Brainvest.Dscribe.Helpers;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class MetadataRelease
	{
		public int Id { get; set; }

		[Column(TypeName = "varchar(200)")]
		public string Version { get; set; }
		public int? VersionCode { get; set; }

		public int AppTypeId { get; set; }
		public AppType AppType { get; set; }

		public DateTime ReleaseTime { get; set; }
		public int CreatedByUserId { get; set; }

		[Required]
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
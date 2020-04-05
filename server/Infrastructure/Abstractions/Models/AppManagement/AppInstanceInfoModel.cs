using System;
using System.ComponentModel.DataAnnotations;

namespace Brainvest.Dscribe.Abstractions.Models.AppManagement
{
	public class AppInstanceInfoModel
	{
		public int Id { get; set; }
		[Required]
		[Range(1, int.MaxValue, ErrorMessage = "The {0} field is required")]
		public int AppTypeId { get; set; }
		public string AppTypeName { get; set; }
		public string AppTypeTitle { get; set; }
		public bool IsEnabled { get; set; }
		public bool IsProduction { get; set; }
		public DateTime? MetadataReleaseReleaseTime { get; set; }
		public string MetadataReleaseVersion { get; set; }
		public int? MetadataReleaseVersionCode { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Title { get; set; }
		public bool UseUnreleasedMetadata { get; set; }
		public string GeneratedCodeNamespace { get; set; }
		[Required]
		public DatabaseProviderEnum DatabaseProviderId { get; set; }
		[Required]
		public string DataConnectionString { get; set; }
		public string LobConnectionString { get; set; }
		public int? MetadataReleaseId { get; set; }
        public bool MigrateDatabase { get; set; }
    }

	public class DataConnectionStringModel
	{
		[Required]
		public string Server { get; set; }
		public string User { get; set; }
		public string Password { get; set; }
		[Required]
		public string Database { get; set; }
		public bool Trusted_Connection { get; set; }
		public bool MultipleActiveResultSets { get; set; }
	}
}
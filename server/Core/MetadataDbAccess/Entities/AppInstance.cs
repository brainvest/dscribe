using Brainvest.Dscribe.Abstractions;
using System.ComponentModel.DataAnnotations;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class AppInstance : IAppInstance
	{
		public int Id { get; set; }

		public int AppTypeId { get; set; }
		public AppType AppType { get; set; }

		[Required, MaxLength(200)]
		public string Name { get; set; }
		[Required, MaxLength(200)]
		public string Title { get; set; }

		public bool IsProduction { get; set; }

		public DatabaseProviderEnum DatabaseProviderId { get; set; }
		public DatabaseProvider DatabaseProvider { get; set; }

		[Required]
		public string DataConnectionString { get; set; }
		public string LobConnectionString { get; set; }
		public bool IsEnabled { get; set; }
		public bool UseUnreleasedMetadata { get; set; }
		public bool MigrateDatabase { get; set; }

		public string GeneratedCodeNamespace { get; set; }

		public int? MetadataReleaseId { get; set; }
		public MetadataRelease MetadataRelease { get; set; }
	}
}
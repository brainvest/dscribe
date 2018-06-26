using Brainvest.Dscribe.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class AppInstance : IAppInstance
	{
		public int Id { get; set; }

		public int AppTypeId { get; set; }
		public AppType AppType { get; set; }

		public string Name { get; set; }
		public string Title { get; set; }

		public bool IsProduction { get; set; }
		public string DataConnectionString { get; set; }
		public bool IsEnabled { get; set; }
		public bool UseUnreleasedMetadata { get; set; }
		public bool MigrateDatabase { get; set; }

		public int? MetadataReleaseId { get; set; }
		public MetadataRelease MetadataRelease { get; set; }
	}
}
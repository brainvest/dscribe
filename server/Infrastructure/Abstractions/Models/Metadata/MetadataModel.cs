using Brainvest.Dscribe.Abstractions.Metadata;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Models.Metadata
{
	public class MetadataModel
	{
		public Dictionary<string, IPropertyGeneralUsageCategory> PropertyDefaults { get; set; }
		public Dictionary<string, IEntityTypeMetadataModel> EntityTypes { get; set; }
	}
}
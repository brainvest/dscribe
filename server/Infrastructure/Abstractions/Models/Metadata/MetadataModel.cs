using Brainvest.Dscribe.Abstractions.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Models.Metadata
{
	public class MetadataModel
	{
		public Dictionary<string, IPropertyGeneralUsageCategory> PropertyDefaults { get; set; }
		public Dictionary<string, IEntityMetadataModel> Types { get; set; }
	}
}
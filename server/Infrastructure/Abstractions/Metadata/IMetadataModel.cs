using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IMetadataModel
	{
		Dictionary<string, IPropertyGeneralUsageCategory> PropertyDefaults { get; }
		IDictionary<string, IEntityMetadata> Entities { get; }
	}
}
using System.Collections.Generic;
using Brainvest.Dscribe.Abstractions.Models.Metadata;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IMetadataModel
	{
		Dictionary<string, IPropertyGeneralUsageCategory> PropertyDefaults { get; }
		IDictionary<string, IEntityTypeMetadataModel> EntityTypes { get; }
	}
}

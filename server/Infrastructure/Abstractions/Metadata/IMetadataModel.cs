using Brainvest.Dscribe.Abstractions.Models.Metadata;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IMetadataModel
	{
		Dictionary<string, IPropertyGeneralUsageCategory> PropertyDefaults { get; }
		IDictionary<string, IEntityTypeMetadataModel> EntityTypes { get; }
	}
}
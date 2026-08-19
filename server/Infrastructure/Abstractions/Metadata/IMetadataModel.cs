namespace Brainvest.Dscribe.Abstractions.Metadata;

using System.Collections.Generic;
using Brainvest.Dscribe.Abstractions.Models.Metadata;

public interface IMetadataModel
{
	Dictionary<string, IPropertyGeneralUsageCategory> PropertyDefaults { get; }
	IDictionary<string, IEntityTypeMetadataModel> EntityTypes { get; }
}

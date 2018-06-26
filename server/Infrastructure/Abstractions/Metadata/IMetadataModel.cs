using Brainvest.Dscribe.Abstractions.Models.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IMetadataModel
	{
		Dictionary<string, IPropertyGeneralUsageCategory> PropertyDefaults { get; }
		IDictionary<string, IEntityMetadataModel> Entities { get; }
	}
}
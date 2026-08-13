namespace Brainvest.Dscribe.Metadata;

using Brainvest.Dscribe.Abstractions.Metadata;

public class PropertyBehaviorMetadata : IPropertyBehaviorMetadata
{
	public IAdditionalBehaviorMetadata AdditionalBehavior { get; set; }
	public string Parameters { get; set; }
}

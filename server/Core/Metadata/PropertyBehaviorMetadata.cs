using Brainvest.Dscribe.Abstractions.Metadata;

namespace Brainvest.Dscribe.Metadata
{
    public class PropertyBehaviorMetadata : IPropertyBehaviorMetadata
    {
        public IAdditionalBehaviorMetadata AdditionalBehavior { get; set; }
        public string Parameters { get; set; }
    }
}

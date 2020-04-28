namespace Brainvest.Dscribe.Abstractions.Metadata
{
    public interface IAdditionalBehaviorMetadata
    {
        public string Name { get; }
        public string Definition { get; }
    }

    public interface IPropertyBehaviorMetadata
    {
        public IAdditionalBehaviorMetadata AdditionalBehavior { get; }
        public string Parameters { get; }
    }
}

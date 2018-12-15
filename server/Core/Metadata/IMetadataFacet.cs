namespace Brainvest.Dscribe.Metadata
{
	public interface IMetadataFacet<TDefaultValueDiscriminator>
		where TDefaultValueDiscriminator : struct
	{
		void AddDefaultValue(TDefaultValueDiscriminator? discriminator, string defaultValue);
	}
}
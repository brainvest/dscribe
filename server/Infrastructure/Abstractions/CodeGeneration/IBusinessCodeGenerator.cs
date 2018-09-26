using Brainvest.Dscribe.Abstractions.Metadata;

namespace Brainvest.Dscribe.Abstractions.CodeGeneration
{
	public interface IBusinessCodeGenerator
	{
	}

	public interface IBusinessCodeGenerator<TCode> : IBusinessCodeGenerator
		where TCode : IBusinessCode
	{
		TCode CreateCode(IMetadataCache cache, IInstanceInfo instanceInfo);
	}
}
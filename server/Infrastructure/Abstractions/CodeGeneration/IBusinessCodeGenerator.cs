using Brainvest.Dscribe.Abstractions.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

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
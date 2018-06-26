using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.CodeGeneration
{
	public interface IBusinessCompiler
	{
	}

	public interface IBusinessCompiler<TCode> : IBusinessCompiler
		where TCode : IBusinessCode
	{
		bool GenerateAssembly(TCode code, string fileName, string assembliesPath, out IEnumerable<string> errors);
	}
}
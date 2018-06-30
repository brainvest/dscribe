using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.CodeGeneration
{
	public interface IBusinessCompiler
	{
	}

	public interface IBusinessCompiler<TCode> : IBusinessCompiler
		where TCode : IBusinessCode
	{
		Task<(bool succeeded, IEnumerable<Diagnostic> diagnostics)> GenerateAssembly(string sourceCodeFile, string fileName, string assembliesPath);
	}
}
namespace Brainvest.Dscribe.Abstractions.CodeGeneration;

using System.Collections.Generic;
using System.Threading.Tasks;
using Brainvest.Dscribe.Abstractions.Metadata;

public interface IBusinessAssemblyGenerator
{
	Task<CodeGenerationResult> GenerateCode(IMetadataCache cache, IInstanceInfo instanceInfo, string path, string instanceName);
}

public class CodeGenerationResult
{
	public bool Succeeded { get; set; }
	public IEnumerable<IDiagnosticInfo> Diagnostics { get; set; }
	public string SourceCodeFileName { get; set; }
	public string AssemblyFileName { get; set; }
}

using Brainvest.Dscribe.Abstractions.Metadata;
using Microsoft.CodeAnalysis;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions.CodeGeneration
{
	public interface IBusinessAssemblyGenerator
	{
		Task<(bool succeeded, IEnumerable<IDiagnosticInfo> diagnostics)> GenerateAssembly(IMetadataCache cache, IInstanceInfo instanceInfo, string path, string instanceName);
	}
}
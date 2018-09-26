using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Composition;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Implementations.EfCore.CodeGenerator
{
	public class EfCoreCompiler
	{
		public async Task<(bool succeeded, IEnumerable<IDiagnosticInfo> diagnostics)> GenerateAssemblyAsync(
			string sourceCodeFile
			, string fileName
			, string assembliesPath)
		{
			var referenceAssembliesPath = Path.GetDirectoryName(typeof(string).Assembly.Location);
			var references = new List<MetadataReference>
			{
				MetadataReference.CreateFromFile(Path.Combine(referenceAssembliesPath, "netstandard.dll")),
				MetadataReference.CreateFromFile(Path.Combine(referenceAssembliesPath, "System.Runtime.dll")),
				MetadataReference.CreateFromFile(typeof(string).Assembly.Location),
				MetadataReference.CreateFromFile(typeof(ExportAttribute).Assembly.Location),
				MetadataReference.CreateFromFile(typeof(DbContext).Assembly.Location),
				MetadataReference.CreateFromFile(typeof(KeyAttribute).Assembly.Location),
				MetadataReference.CreateFromFile(typeof(IBusinessRepositoryFactory).Assembly.Location),
			};
			string sourceCode;
			using (var fileStream = new FileStream(sourceCodeFile, FileMode.Open, FileAccess.Read))
			using (var reader = new StreamReader(fileStream))
			{
				sourceCode = await reader.ReadToEndAsync();
			}
			if (!CSharpLanguage.CompileToAssembly(sourceCode, Path.GetFileNameWithoutExtension(fileName), fileName, references, out var diagnostics))
			{
				return (false, diagnostics?.Select(x => new DiagnosticInfo { Message = x.GetMessage() }));
			}
			return (true, null);
		}
	}
}
using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
		public async Task<CodeGenerationResult> GenerateAssemblyAsync(
			string sourceCodeFile
			, string assymblyFileName
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
				MetadataReference.CreateFromFile(typeof(JsonIgnoreAttribute).Assembly.Location),
			};
			string sourceCode;
			using (var fileStream = new FileStream(sourceCodeFile, FileMode.Open, FileAccess.Read))
			using (var reader = new StreamReader(fileStream))
			{
				sourceCode = await reader.ReadToEndAsync();
			}
			if (!CSharpLanguage.CompileToAssembly(sourceCode, Path.GetFileNameWithoutExtension(assymblyFileName), assymblyFileName, references, out var diagnostics))
			{
				return new CodeGenerationResult
				{
					Succeeded = false,
					SourceCodeFileName = sourceCodeFile,
					Diagnostics = diagnostics?.Select(x => new DiagnosticInfo { Message = x.GetMessage() })
				};
			}
			return new CodeGenerationResult
			{
				Succeeded = true,
				AssemblyFileName = assymblyFileName,
				SourceCodeFileName = sourceCodeFile
			};
		}
	}
}
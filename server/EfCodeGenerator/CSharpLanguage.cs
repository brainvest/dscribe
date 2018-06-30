using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Host;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Brainvest.Dscribe.Implementations.Ef.CodeGenerator
{
	public class CSharpLanguage : ILanguageService
	{
		private static readonly LanguageVersion MaxLanguageVersion = Enum
				.GetValues(typeof(LanguageVersion))
				.Cast<LanguageVersion>()
				.Max();

		public SyntaxTree ParseText(string sourceCode, SourceCodeKind kind)
		{
			var options = new CSharpParseOptions(kind: kind, languageVersion: MaxLanguageVersion);

			// Return a syntax tree of our source code
			return CSharpSyntaxTree.ParseText(sourceCode, options);
		}

		public Compilation CreateLibraryCompilation(string assemblyName, bool enableOptimisations, IEnumerable<MetadataReference> references)
		{
			var options = new CSharpCompilationOptions(
				OutputKind.DynamicallyLinkedLibrary,
				optimizationLevel: enableOptimisations ? OptimizationLevel.Release : OptimizationLevel.Debug,
				allowUnsafe: true);

			return CSharpCompilation.Create(assemblyName, options: options, references: references);
		}

		public static bool CompileToAssembly(string code, string assemblyName, string path, IEnumerable<MetadataReference> references
			, out IEnumerable<Diagnostic> diagnostics)
		{
			var sourceLanguage = new CSharpLanguage();
			SyntaxTree syntaxTree = sourceLanguage.ParseText(code, SourceCodeKind.Regular);
			Compilation compilation = sourceLanguage
				.CreateLibraryCompilation(assemblyName: assemblyName, enableOptimisations: false, references)
				.AddSyntaxTrees(syntaxTree);

			using (var stream = new FileStream(path, FileMode.Create, FileAccess.Write))
			{
				var emitResult = compilation.Emit(stream);
				if (!emitResult.Success)
				{
					diagnostics = emitResult.Diagnostics;
					return false;
				}
				stream.Flush();
			}
			diagnostics = null;
			return true;
		}
	}
}
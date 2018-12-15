using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Brainvest.Dscribe.Abstractions.Metadata;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Implementations.EfCore.CodeGenerator
{
	class EfCoreAssemblyGenerator : IBusinessAssemblyGenerator
	{
		public async Task<CodeGenerationResult> GenerateCode(IMetadataCache cache, IInstanceInfo instanceInfo, string path, string instanceName)
		{
			var codeGen = new EfCoreCodeGenerator();
			var compileUnit = codeGen.CreateCode(cache, instanceInfo);
			var compositionDirectory = Path.Combine(path, instanceInfo.InstanceName);
			EnsurePath(compositionDirectory);
			var sourceCodeFilePath = Path.Combine(compositionDirectory, "source.cs");
			codeGen.GenerateSourceCode(compileUnit, sourceCodeFilePath);
			var assembliesPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location); //TODO: This is hardcoded
			var assemblyPath = Path.Combine(compositionDirectory, instanceName + ".dll");
			return await new EfCoreCompiler().GenerateAssemblyAsync(sourceCodeFilePath, assemblyPath, assembliesPath);
		}

		private void EnsurePath(string pluginsDirectory)
		{
			if (Directory.GetDirectoryRoot(pluginsDirectory).Equals(pluginsDirectory, StringComparison.InvariantCultureIgnoreCase))
			{
				return;
			}
			EnsurePath(Directory.GetParent(pluginsDirectory).FullName);
			if (!Directory.Exists(pluginsDirectory))
			{
				Directory.CreateDirectory(pluginsDirectory);
			}
		}
	}
}

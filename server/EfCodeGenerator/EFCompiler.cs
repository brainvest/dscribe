using Brainvest.Dscribe.Abstractions.CodeGeneration;
using Microsoft.CSharp;
using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Implementations.Ef.CodeGenerator
{
	public class EFCompiler : IBusinessCompiler<CodeDomBusinessCode>
	{
		public bool GenerateAssembly(
			CodeDomBusinessCode compileUnit
			, string fileName
			, string assembliesPath
			, out IEnumerable<string> errors)
		{
			var provider = new CSharpCodeProvider();
			var parameters = new CompilerParameters
			{
				GenerateExecutable = false,
				OutputAssembly = fileName,
				GenerateInMemory = false
			};
			parameters.ReferencedAssemblies.Add("System.dll");
			parameters.ReferencedAssemblies.Add("System.Runtime.dll");
			parameters.ReferencedAssemblies.Add("System.Core.dll");
			parameters.ReferencedAssemblies.Add("System.ComponentModel.Composition.dll");
			parameters.ReferencedAssemblies.Add(Path.Combine(assembliesPath, "EntityFramework.dll"));
			parameters.ReferencedAssemblies.Add("System.ComponentModel.DataAnnotations.dll");
			parameters.ReferencedAssemblies.Add(Path.Combine(assembliesPath, "GlobalE.Server.Contracts.dll"));

			var results = provider.CompileAssemblyFromDom(parameters, compileUnit.Code);
			if (results.Errors.Count > 0)
			{
				errors = results.Errors.OfType<CompilerError>().Select(x => x.ToString());
				return false;
			}
			errors = null;
			return true;
		}
	}
}
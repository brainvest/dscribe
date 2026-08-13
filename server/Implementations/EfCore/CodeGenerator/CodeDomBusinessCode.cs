using System.CodeDom;
using Brainvest.Dscribe.Abstractions.CodeGeneration;

namespace Brainvest.Dscribe.Implementations.EfCore.CodeGenerator
{
	public class CodeDomBusinessCode : IBusinessCode
	{
		public CodeCompileUnit Code { get; set; }
	}
}

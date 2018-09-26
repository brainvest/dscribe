using Brainvest.Dscribe.Abstractions.CodeGeneration;
using System.CodeDom;

namespace Brainvest.Dscribe.Implementations.EfCore.CodeGenerator
{
	public class CodeDomBusinessCode : IBusinessCode
	{
		public CodeCompileUnit Code { get; set; }
	}
}
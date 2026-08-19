namespace Brainvest.Dscribe.Implementations.EfCore.CodeGenerator;

using System.CodeDom;
using Brainvest.Dscribe.Abstractions.CodeGeneration;

public class CodeDomBusinessCode : IBusinessCode
{
	public CodeCompileUnit Code { get; set; }
}

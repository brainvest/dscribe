using Brainvest.Dscribe.Abstractions.CodeGeneration;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Implementations.Ef.CodeGenerator
{
	public class CodeDomBusinessCode : IBusinessCode
	{
		public CodeCompileUnit Code { get; set; }
	}
}
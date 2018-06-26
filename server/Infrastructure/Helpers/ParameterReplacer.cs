using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Helpers
{
	public class ParameterReplacer : ExpressionVisitor
	{
		IEnumerable<ParameterExpression> _replacementParameters;
		public ParameterReplacer(IEnumerable<ParameterExpression> replacementParameters)
		{
			_replacementParameters = replacementParameters;
		}

		protected override Expression VisitParameter(ParameterExpression node)
		{
			var replacement = _replacementParameters.FirstOrDefault(x => x.Type == node.Type);
			if (replacement != null)
			{
				return replacement;
			}
			return base.Visit(node);
		}
	}
}
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IBusinessReflector
	{
		Type GetType(string typeName);
		LambdaExpression GetPropetyExpression(Type entityType, string propertyName, params ParameterExpression[] parameters);
	}
}
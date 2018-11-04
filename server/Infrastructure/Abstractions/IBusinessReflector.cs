using System;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IBusinessReflector
	{
		Type GetType(string typeName);
		LambdaExpression GetPropetyExpression(Type entityType, string propertyName, params ParameterExpression[] parameters);
	}
}
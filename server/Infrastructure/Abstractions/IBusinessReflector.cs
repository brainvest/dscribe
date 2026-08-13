namespace Brainvest.Dscribe.Abstractions;

using System;
using System.Linq.Expressions;

public interface IBusinessReflector
{
	Type GetType(string typeName);
	LambdaExpression GetPropetyExpression(Type entityType, string propertyName, params ParameterExpression[] parameters);
}

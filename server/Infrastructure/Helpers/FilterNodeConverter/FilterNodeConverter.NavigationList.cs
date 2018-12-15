using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Helpers.FilterNodeConverter
{
	static partial class FilterNodeConverter
	{
		private static Expression VisitNavigationList(FilterNodeModel node, Dictionary<string, ParameterExpression> parameters, IBusinessReflector reflector, Expression parent)
		{
			var elementType = parent.Type.GetGenericArguments().Single();
			LambdaExpression filter = null;
			if (node.Operator != FilterOperator.IsEmpty && node.Operator != FilterOperator.IsNotEmpty && node.Children[0] != null)
			{
				filter = (LambdaExpression)Visit(node.Children[0], parameters, reflector, parent);
				if (filter.ReturnType == typeof(bool?))
				{
					filter = Expression.Lambda(ConvertType(filter.Body, typeof(bool)), filter.Parameters);
				}
			}

			if (node.Operator == FilterOperator.Count || node.Operator == FilterOperator.Sum || node.Operator == FilterOperator.Average)
			{
				return MakeAggreagationCondition(node, parameters, reflector, parent, elementType, filter);
			}

			var methodName = node.Operator == FilterOperator.All ? nameof(Enumerable.All) : nameof(Enumerable.Any);
			var negate = node.Operator == FilterOperator.None || node.Operator == FilterOperator.IsEmpty;
			var parameterCount = filter == null ? 1 : 2;
			var method = typeof(Enumerable).GetMethods()
				.Single(x => x.Name == methodName && x.GetParameters().Length == parameterCount);
			method = method.MakeGenericMethod(elementType);
			var expression = Expression.Call(method,
				parameterCount == 1
				? new Expression[] { parent }
				: new Expression[] { parent, filter });
			if (negate)
			{
				return Expression.Not(expression);
			}
			return expression;
		}

		private static Expression MakeAggreagationCondition(FilterNodeModel node, Dictionary<string, ParameterExpression> parameters, IBusinessReflector reflector, Expression parent, Type elementType, Expression filter)
		{
			var expression = parent;

			if (filter != null)
			{
				var whereMethod = typeof(Enumerable).GetMethods().Single(x => x.Name == nameof(Enumerable.Where)
					&& x.GetParameters().Last().ParameterType.GetGenericArguments().Length == 2);
				whereMethod = whereMethod.MakeGenericMethod(elementType);
				expression = Expression.Call(null, whereMethod, expression, filter);
			}

			if (node.Operator == FilterOperator.Count)
			{
				var method = typeof(Enumerable).GetMethods().Single(x => x.Name == nameof(Enumerable.Count) && x.GetParameters().Length == 1);
				method = method.MakeGenericMethod(elementType);
				expression = Expression.Call(null, method, expression);
			}
			else
			{
				var methodName = node.Operator.ToString();
				var selection = Visit(node.Children[1], parameters, reflector, parent) as LambdaExpression;
				var method = typeof(Enumerable).GetMethods().Single(x => x.Name == methodName && x.GetParameters().Length == 2
					&& x.GetParameters()[1].ParameterType.GetGenericArguments().Last() == selection.ReturnType);
				method = method.MakeGenericMethod(elementType);
				expression = Expression.Call(null, method, expression, selection);
			}
			return expression;
		}
	}
}
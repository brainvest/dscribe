using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Brainvest.Dscribe.Helpers
{
	public static class ExpressionBuilder
	{
		public static LambdaExpression Property<TEntity>(string propertyName, ParameterExpression param = null)
		{
			if (param == null)
			{
				param = Expression.Parameter(typeof(TEntity));
			}
			var prop = Expression.Property(param, propertyName);
			return Expression.Lambda(prop, param);
		}

		public static LambdaExpression Path(string path, ParameterExpression param)
		{
			Expression prop = param;
			foreach (var part in path.Split('.'))
			{
				prop = Expression.Property(prop, part);
			}
			return Expression.Lambda(prop, param);
		}

		public static LambdaExpression GetSimpleAggregate(AggregationInfo x, ParameterExpression grouppedParam)
		{
			LambdaExpression selectExpression;
			string methodName = x.Aggregate.ToString();
			MethodInfo method;
			var elementType = grouppedParam.Type.GetTypeInfo().GetInterface("IEnumerable`1").GetTypeInfo().GetGenericArguments().Single();
			if (string.IsNullOrWhiteSpace(x.SourcePropertyName))
			{
				selectExpression = null;
				method = typeof(Enumerable).GetTypeInfo().GetMethods().Single(m => m.Name == methodName && m.GetParameters().Length == 1);
				method = method.MakeGenericMethod(elementType);
			}
			else
			{
				var itemParam = Expression.Parameter(elementType, "item");
				selectExpression = ExpressionBuilder.Path(x.SourcePropertyName, itemParam);
				var returnType = selectExpression.ReturnType;
				if (returnType == typeof(Int16) || returnType == typeof(byte) || returnType == typeof(SByte) || returnType == typeof(UInt16))
				{
					returnType = typeof(int);
					selectExpression = Expression.Lambda(Expression.Convert(selectExpression.Body, returnType), selectExpression.Parameters);
				}
				method = typeof(Enumerable).GetTypeInfo().GetMethods().Single(m => m.Name == methodName && m.GetParameters().Length == 2 &&
						m.GetParameters()[1].ParameterType.GetTypeInfo().GetGenericArguments().Last() == returnType);
				method = method.MakeGenericMethod(elementType);
			}
			var parameters = selectExpression == null ? new Expression[] { grouppedParam } : new Expression[] { grouppedParam, selectExpression };
			var invoke = Expression.Call(method, parameters);
			return Expression.Lambda(invoke, grouppedParam);
		}
	}
}
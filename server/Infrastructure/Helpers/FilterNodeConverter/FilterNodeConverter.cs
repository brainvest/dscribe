using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Helpers.FilterNodeConverter
{
	public static partial class FilterNodeConverter
	{
		public static Expression<Func<T, bool>> ToExpression<T>(this FilterNodeModel node, IBusinessReflector reflector)
		{
			return ToExpression(node, reflector) as Expression<Func<T, bool>>;
		}

		public static LambdaExpression ToExpression(this FilterNodeModel node, IBusinessReflector reflector)
		{
			if (node.NodeType != FilterNodeType.Lambda)
			{
				throw new Exception();
			}
			var parameters = new Dictionary<string, ParameterExpression>();
			var expression = Visit(node, parameters, reflector, null);
			return expression as LambdaExpression;
		}

		private static Expression Visit(FilterNodeModel node, Dictionary<string, ParameterExpression> parameters, IBusinessReflector reflector, Expression parent)
		{
			switch (node.NodeType)
			{
				case FilterNodeType.Logical:
					return VisitLogical(node, parameters, reflector, parent);
				case FilterNodeType.Comparison:
				case FilterNodeType.Arithmetic:
					return VisitOperator(node, parameters, reflector, parent);
				case FilterNodeType.NavigationList:
					return VisitNavigationList(node, parameters, reflector, parent);
				case FilterNodeType.Lambda:
					return VisitLambda(node, parameters, reflector, parent);
				case FilterNodeType.Property:
					return VisitProperty(node, parameters, reflector, parent);
				default:
					throw new NotImplementedException();
			}
		}

		private static Expression VisitProperty(FilterNodeModel node, Dictionary<string, ParameterExpression> parameters, IBusinessReflector reflector, Expression parent)
		{
			var propertyName = node.PropertyName;
			var property = Expression.Property(parent, propertyName);
			if (node.Children == null || !node.Children.Any() || node.Children.SingleOrDefault() == null)
			{
				return property;
			}
			return Visit(node.Children.Single(), parameters, reflector, property);
		}

		private static Expression VisitLogical(FilterNodeModel node, Dictionary<string, ParameterExpression> parameters, IBusinessReflector reflector, Expression parent)
		{
			Expression current = null;
			foreach (var child in node.Children)
			{
				var childExpression = Visit(child, parameters, reflector, parent);
				if (current == null)
				{
					current = childExpression;
				}
				else
				{
					if (current.Type == typeof(bool) && childExpression.Type == typeof(bool?))
					{
						current = ConvertType(current, typeof(bool?));
					}
					if (current.Type == typeof(bool?) && childExpression.Type == typeof(bool))
					{
						childExpression = ConvertType(childExpression, typeof(bool?));
					}
					switch (node.Operator)
					{
						case FilterOperator.And:
							current = Expression.AndAlso(current, childExpression);
							break;
						case FilterOperator.Or:
							current = Expression.OrElse(current, childExpression);
							break;
						default:
							throw new NotImplementedException();
					}
				}
			}
			return current;
		}

		private static Expression VisitLambda(FilterNodeModel node, Dictionary<string, ParameterExpression> parameters, IBusinessReflector reflector, Expression parent)
		{
			if (!parameters.TryGetValue(node.ParameterName, out var parameter))
			{
				parameter = Expression.Parameter(reflector.GetType(node.DataType), node.ParameterName);
				parameters.Add(node.ParameterName, parameter);
			}
			else
			{
				if (parameter.Type != reflector.GetType(node.DataType))
				{
					throw new Exception("Parameter names are re-used with incompatible types");
				}
			}
			var body = Visit(node.Children[0], parameters, reflector, parameter);
			return Expression.Lambda(body, parameter);
		}
	}
}
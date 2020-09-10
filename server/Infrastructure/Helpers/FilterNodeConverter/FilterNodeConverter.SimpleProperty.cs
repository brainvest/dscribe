using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.Filtering;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Helpers.FilterNodeConverter
{
	partial class FilterNodeConverter
	{
		private static Expression VisitOperator(FilterNodeModel node, Dictionary<string, ParameterExpression> parameters, IBusinessReflector reflector, Expression parent)
		{
			var children = new List<Expression>(node.Children.Length);
			Type type = null;
			foreach (var child in node.Children)
			{
				if (child.NodeType == FilterNodeType.Constant)
				{
					children.Add(VisitConstant(child, type));
				}
				else
				{
					children.Add(Visit(child, parameters, reflector, parent));
				}
				if (children.Count == 1)
				{
					type = children[0].Type;
				}
			}
			children = UnifyDataTypes(children, null).ToList();
			var simplified = SimplifyEqualToBool(node, children);
			if (simplified != null)
			{
				return simplified;
			}
			switch (node.Operator)
			{
				case FilterOperator.Contains:
				case FilterOperator.EndsWith:
				case FilterOperator.StartsWith:
					return MakeStringContainment(node.Operator.Value, children);
				case FilterOperator.Equal:
				case FilterOperator.NotEqual:
				case FilterOperator.IsNull:
				case FilterOperator.IsNotNull:
					return MakeEquality(node.Operator.Value, children);
				case FilterOperator.GreaterThan:
				case FilterOperator.greaterThanOrEqual:
				case FilterOperator.LessThan:
				case FilterOperator.LessThanOrEqual:
				case FilterOperator.Between:
					if (children[0].Type == typeof(string))
					{
						return MakeStringComparison(node.Operator.Value, children);
					}
					return MakeComparison(node.Operator.Value, children);

				case FilterOperator.Abs:
					return MakeUnaryArithmetic(node.Operator.Value, children.Single());

				case FilterOperator.Add:
				case FilterOperator.Multiply:
					return MakeMultyArithmetic(node.Operator.Value, children);
				case FilterOperator.Subtract:
				case FilterOperator.Divide:
				case FilterOperator.Power:
				case FilterOperator.Log:
					return MakeBinaryArithmetic(node.Operator.Value, children);
				default:
					throw new NotImplementedException();
			}
		}

		private static Expression SimplifyEqualToBool(FilterNodeModel node, List<Expression> children)
		{
			var first = children[0];
			if (first.Type == typeof(bool?))
			{
				if (children.Count == 1)
				{
					if (node.Operator == null)
					{
						return Expression.Property(first, nameof(Nullable<bool>.Value));
					}
					else if (node.Operator == FilterOperator.IsNull)
					{
						Expression.Not(Expression.Property(first, nameof(Nullable<bool>.Value)));
					}
					else if (node.Operator == FilterOperator.IsNotNull)
					{
						Expression.Property(first, nameof(Nullable<bool>.Value));
					}
				}
				else if (children.Count == 2)
				{
					var second = children[1];
					if (second is ConstantExpression)
					{
						var constant = (second as ConstantExpression);
						if (constant.Value == null)
						{
							first = Expression.Property(first, nameof(Nullable<bool>.HasValue));
							if (node.Operator == FilterOperator.Equal)
							{
								return Expression.Not(first);
							}
							return first;
						}
						else if (constant.Value is bool)
						{
							first = Expression.Property(first, nameof(Nullable<bool>.Value));
							if (node.Operator == FilterOperator.Equal ^ (bool)(children[1] as ConstantExpression).Value)
							{
								return Expression.Not(first);
							}
							return first;
						}
					}
				}
			}
			if (first.Type == typeof(bool))
			{

				if (node.Operator == null)
				{
					return first;
				}
				if (children.Count == 2)
				{
					if ((node.Operator == FilterOperator.Equal || node.Operator == FilterOperator.NotEqual) && children[1] is ConstantExpression && (children[1] as ConstantExpression).Value is bool)
					{
						if (node.Operator == FilterOperator.Equal ^ (bool)(children[1] as ConstantExpression).Value)
						{
							return Expression.Not(first);
						}
						return first;
					}
				}
			}
			return null;
		}

		private static Expression MakeUnaryArithmetic(FilterOperator @operator, Expression child)
		{
			switch (@operator)
			{
				case FilterOperator.Abs:
					return Expression.Call(typeof(Math).GetMethods().Single(x => x.Name == nameof(Math.Abs) && x.GetParameters().Single().ParameterType == child.Type), child);
				default:
					throw new NotImplementedException();
			}
		}

		private static Expression MakeBinaryArithmetic(FilterOperator @operator, List<Expression> children)
		{
			switch (@operator)
			{
				case FilterOperator.Subtract:
					return Expression.Subtract(children[0], children[1]);
				case FilterOperator.Divide:
					return Expression.Divide(children[0], children[1]);
				case FilterOperator.Log:
					return Expression.Call(typeof(Math).GetMethods().Single(x => x.Name == nameof(Math.Log10) && x.GetParameters().Single().ParameterType == typeof(double?)), children.Select(c => ConvertType(c, typeof(double?))));
				case FilterOperator.Power:
					return Expression.Call(typeof(Math).GetMethods().Single(x => x.Name == nameof(Math.Pow) && x.GetParameters().Length == 2), children.Select(c => ConvertType(c, typeof(double))));
				default:
					throw new NotImplementedException();
			}
		}

		private static Expression MakeMultyArithmetic(FilterOperator @operator, List<Expression> children)
		{
			Expression current = children[0];
			foreach (var child in children.Skip(1))
			{
				switch (@operator)
				{
					case FilterOperator.Add:
						current = Expression.Add(current, child);
						continue;
					case FilterOperator.Multiply:
						current = Expression.Multiply(current, child);
						continue;
					default:
						throw new NotImplementedException();
				}
			}
			return current;
		}

		private static Expression VisitConstant(FilterNodeModel node, Type type)
		{
			if (node.Values.Length == 1)
			{
				return Constant(node.Values[0], type);
			}
			var list = Activator.CreateInstance(typeof(List<>).MakeGenericType(type));
			var add = list.GetType().GetMethod(nameof(IList.Add));
			foreach (var val in node.Values)
			{
				add.Invoke(list, new object[] { ConvertValue(val, type) });
			}
			return Constant(list, typeof(IEnumerable<>).MakeGenericType(type));
		}

		private static Expression MakeComparison(FilterOperator filterOperator, IList<Expression> children)
		{
			if (children[0].Type == typeof(string))
			{
				return MakeStringComparison(filterOperator, children);
			}
			switch (filterOperator)
			{
				case FilterOperator.GreaterThan:
					return Expression.GreaterThan(children[0], children[1]);
				case FilterOperator.greaterThanOrEqual:
					return Expression.GreaterThanOrEqual(children[0], children[1]);
				case FilterOperator.LessThan:
					return Expression.LessThan(children[0], children[1]);
				case FilterOperator.LessThanOrEqual:
					return Expression.LessThanOrEqual(children[0], children[1]);
				case FilterOperator.Between:
					return Expression.AndAlso(Expression.GreaterThanOrEqual(children[0], children[1]), Expression.LessThanOrEqual(children[0], children[2]));
				default:
					throw new NotImplementedException();
			}
		}

		private static Expression MakeStringComparison(FilterOperator filterOperator, IList<Expression> children)
		{
			var compareTo = typeof(string).GetMethods().Single(x => x.Name == nameof(string.CompareTo)
												&& x.GetParameters().Single().ParameterType == typeof(string));
			var call = Expression.Call(children[0], compareTo, children[1]);
			var zero = Constant(0, typeof(int));
			switch (filterOperator)
			{
				case FilterOperator.GreaterThan:
					return Expression.GreaterThan(call, zero);
				case FilterOperator.greaterThanOrEqual:
					return Expression.GreaterThanOrEqual(call, zero);
				case FilterOperator.LessThan:
					return Expression.LessThan(call, zero);
				case FilterOperator.LessThanOrEqual:
					return Expression.LessThanOrEqual(call, zero);
				case FilterOperator.Between:
					var call2 = Expression.Call(children[0], compareTo, children[2]);
					return Expression.AndAlso(Expression.GreaterThanOrEqual(call, zero), Expression.LessThanOrEqual(call2, zero));
				default:
					throw new NotImplementedException();
			}
		}

		private static Expression MakeEquality(FilterOperator filterOperator, IList<Expression> children)
		{
			var values = filterOperator == FilterOperator.IsNull || filterOperator == FilterOperator.IsNotNull
				? Expression.Constant(null, children[0].Type) : children[1];
			if (children.Count == 1 || children[1].Type == children[0].Type)
			{
				if (filterOperator == FilterOperator.Equal || filterOperator == FilterOperator.IsNull)
				{
					return Expression.Equal(children[0], values);
				}
				return Expression.NotEqual(children[0], values);
			}
			var contains = typeof(Enumerable).GetMethods().Single(x => x.Name == nameof(Enumerable.Contains) && x.GetParameters().Length == 2);
			contains = contains.MakeGenericMethod(children[0].Type);
			var containsExpression = Expression.Call(contains, children[1], children[0]);
			if (filterOperator == FilterOperator.NotEqual)
			{
				return Expression.Not(containsExpression);
			}
			return containsExpression;
		}

		private static Expression MakeStringContainment(FilterOperator filterOperator, IList<Expression> children)
		{
			var methodName = filterOperator.ToString();
			var method = typeof(string).GetMethods().Single(x => x.Name == methodName && x.GetParameters().Length == 1 && x.GetParameters().Single().ParameterType == typeof(string));
			if (children[1].Type == children[0].Type)
			{
				return Expression.Call(children[0], method, children[1]);
			}
			var param = Expression.Parameter(typeof(string), "textItem");
			var lambda = Expression.Lambda(Expression.Call(children[0], method, param), param);
			var anyMethod = typeof(Enumerable).GetMethods().Single(x => x.Name == nameof(Enumerable.Any) && x.GetParameters().Length == 2);
			anyMethod = anyMethod.MakeGenericMethod(typeof(string));
			return Expression.Call(anyMethod, children[1], lambda);
		}
	}
}
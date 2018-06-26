using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Helpers.FilterNodeConverter
{
	public static partial class FilterNodeConverter
	{
		public static Expression ConvertType(Expression exp, Type requiredType)
		{
			if (exp.Type == requiredType)
			{
				return exp;
			}
			return Expression.Convert(exp, requiredType);
		}

		public static (Expression first, Expression second) UnifyTypes(Expression first, Expression second)
		{
			var result = UnifyDataTypes(new Expression[] { first, second }, null).ToArray();
			return (result[0], result[1]);
		}

		private static List<Type> _types = new List<Type> { typeof(byte), typeof(sbyte), typeof(ushort), typeof(short)
			, typeof(uint), typeof(int), typeof(ulong), typeof(long), typeof(decimal), typeof(double)};

		public static IEnumerable<Expression> UnifyDataTypes(IEnumerable<Expression> expressions, IEnumerable<Type> allowedTypes = null)
		{
			var types = expressions.Select(
				x => x.Type != typeof(string) && x.Type.IsGenericType && typeof(IEnumerable).IsAssignableFrom(x.Type) ? x.Type.GetGenericArguments().Single() : x.Type)
				.Distinct().ToArray();
			if (types.Length < 2)
			{
				return expressions;
			}
			var bestType = FindBestType(types, allowedTypes);
			return expressions.Select(x =>
			{
				if (x.Type != typeof(string) && x.Type.IsGenericType && typeof(IEnumerable).IsAssignableFrom(x.Type))
				{
					if (x.Type.GetGenericArguments().Single() == bestType)
					{
						return x;
					}
					var list = ((ConstantExpression)x).Value as IEnumerable;
					var newList = Activator.CreateInstance(typeof(List<>).MakeGenericType(bestType)) as IList;
					foreach (var value in list)
					{
						if (value== null || value.GetType() == bestType)
						{
							newList.Add(value);
						}
						newList.Add(ConvertValue(value, bestType));
						return Expression.Constant(newList);
					}
					return Expression.Constant(list);
				}
				return ConvertType(x, bestType);
			});
		}

		public static Type FindBestType(IEnumerable<Type> inputTypes, IEnumerable<Type> allowedTypes = null)
		{
			var largestIndex = 0;
			var hasNullable = false;
			foreach (var inputType in inputTypes)
			{
				var type = inputType;
				if (!type.IsValueType)
				{
					throw new Exception("Can only convert numeric types");
				}
				if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
				{
					type = type.GetGenericArguments().Single();
					hasNullable = true;
				}
				var index = _types.IndexOf(type);
				if (index == -1)
				{
					throw new Exception("Can only convert numeric types");
				}
				if (index > largestIndex)
				{
					largestIndex = index;
				}
			}
			var bestType = _types[largestIndex];
			if (hasNullable)
			{
				bestType = typeof(Nullable<>).MakeGenericType(bestType);
			}
			return bestType;
		}

	}

}

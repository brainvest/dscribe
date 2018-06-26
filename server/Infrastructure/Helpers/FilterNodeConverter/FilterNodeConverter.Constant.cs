using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace Brainvest.Dscribe.Helpers.FilterNodeConverter
{
	partial class FilterNodeConverter
	{
		private static Expression Constant(object value, Type type)
		{
			value = ConvertValue(value, type);
			return Expression.Constant(value, type);
		}

		private static object ConvertValue(object value, Type type)
		{
			if (value is string)
			{
				if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
				{
					var nonGenericType = type.GetGenericArguments().Single();
					if (value.GetType() != nonGenericType)
					{
						value = Convert.ChangeType(value, nonGenericType);
					}
				}
				else
				{
					value = Convert.ChangeType(value, type);
				}
			}
			if (value != null && value.GetType().IsValueType && value.GetType() != type)
			{
				if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
				{
					var nonGenericType = type.GetGenericArguments().Single();
					if (value.GetType() != nonGenericType)
					{
						value = Convert.ChangeType(value, nonGenericType);
					}
				}
				else
				{
					value = Convert.ChangeType(value, type);
				}
			}

			return value;
		}
	}
}
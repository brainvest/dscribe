using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Brainvest.Dscribe.Helpers
{
	public static class ImplicitTypeConvertor
	{
		public static bool CanConvert(Type actualType, Type expectedType)
		{
			throw new NotImplementedException();
		}

		public static object ConvertValue(object value, Type expectedType)
		{
			var expectedTypeInfo = expectedType.GetTypeInfo();
			if (expectedTypeInfo.IsValueType)
			{
				if (value == null)
				{
					return Activator.CreateInstance(expectedType);
				}
				else
				{
					if (expectedTypeInfo.IsGenericType && expectedTypeInfo.GetGenericTypeDefinition() == typeof(Nullable<>)
						&& expectedTypeInfo.GetGenericArguments().Single() != value.GetType())
					{
						return Convert.ChangeType(value, expectedTypeInfo.GetGenericArguments().Single());
						//Value = Convert.ChangeType(Value, Type);
					}
					else if (expectedType != typeof(bool?))
					{
						return Convert.ChangeType(value, expectedType);
					}
					else
						return value;
				}
			}
			else
			{
				return Convert.ChangeType(value, expectedType);
			}
		}
	}
}
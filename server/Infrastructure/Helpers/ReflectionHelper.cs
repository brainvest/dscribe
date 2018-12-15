using System;
using System.Linq;
using System.Reflection;

namespace Brainvest.Dscribe.Helpers
{
	public static class ReflectionHelper
	{
		public static bool IsNullableType(this Type type, out Type valueType)
		{
			var info = type.GetTypeInfo();
			if (!info.IsGenericType || info.GetGenericTypeDefinition() != typeof(Nullable<>))
			{
				valueType = null;
				return false;
			}
			valueType = info.GetGenericArguments().Single();
			return true;
		}

		public static Type GetACommonConversionType(Type a, Type b)
		{
			if (a == b)
			{
				return a;
			}
			var isANullable = a.IsNullableType(out var an);
			var isBNullable = b.IsNullableType(out var bn);
			if (isANullable && an == b)
			{
				return a;
			}
			if (isBNullable && bn == a)
			{
				return b;
			}
			a = an ?? a;
			b = bn ?? b;
			if ((a == typeof(int) && b == typeof(long))
				|| (a == typeof(long) && b == typeof(int)))
			{
				if (isANullable || isBNullable)
				{
					return typeof(long?);
				}
				return typeof(long);
			}
			if ((a == typeof(byte) && b == typeof(long))
				|| (a == typeof(long) && b == typeof(byte)))
			{
				if (isANullable || isBNullable)
				{
					return typeof(long?);
				}
				return typeof(long);
			}

			throw new NotImplementedException($"The conversion between {a} and {b} is not yet implemented.");
		}
	}
}
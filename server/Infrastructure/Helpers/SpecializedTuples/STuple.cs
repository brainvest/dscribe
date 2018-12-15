using System;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Helpers.SpecializedTuples
{
	public class STuple : IEquatable<STuple>
	{
		private static Dictionary<int, Type> _tupleTypes = new Dictionary<int, Type>
		{
			{0, typeof(STuple) },
			{1, typeof(STuple<>) },
			{2, typeof(STuple<,>) },
			{3, typeof(STuple<,,>) },
			{4, typeof(STuple<,,,>) },
			{5, typeof(STuple<,,,,>) },
			{6, typeof(STuple<,,,,,>) },
			{7, typeof(STuple<,,,,,,>) },
			{8, typeof(STuple<,,,,,,,>) },
		};

		public static Type GetTupleType(params Type[] itemTypes)
		{
			return _tupleTypes[itemTypes.Length].MakeGenericType(itemTypes);
		}

		public bool Equals(STuple other)
		{
			return other != null;
		}

		public override bool Equals(object obj)
		{
			return (obj is STuple a) && this.Equals(a);
		}

		public override int GetHashCode()
		{
			return 17;
		}

		public static bool operator ==(STuple a, STuple b)
		{
			if (a == null)
			{
				return b == null;
			}
			return a.Equals(b);
		}

		public static bool operator !=(STuple a, STuple b)
		{
			return !(a == b);
		}
	}
}
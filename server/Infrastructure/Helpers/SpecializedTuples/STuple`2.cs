using System;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Helpers.SpecializedTuples
{
	public class STuple<T1, T2> : IEquatable<STuple<T1, T2>>
	{
		public T1 Item1 { get; set; }
		public T2 Item2 { get; set; }

		public bool Equals(STuple<T1, T2> b)
		{
			return b != null &&
				((Item1 == null && b.Item1 == null) || EqualityComparer<T1>.Default.Equals(Item1, b.Item1)) &&
				((Item2 == null && b.Item2 == null) || EqualityComparer<T2>.Default.Equals(Item2, b.Item2));
		}

		public override bool Equals(object obj)
		{
			return (obj is STuple<T1, T2> b) && this.Equals(b);
		}

		public override int GetHashCode()
		{
			var hash = 17;
			hash = hash * 23 + (Item1 == null ? 0 : Item1.GetHashCode());
			hash = hash * 23 + (Item2 == null ? 0 : Item2.GetHashCode());
			return hash;
		}

		public static bool operator ==(STuple<T1, T2> a, STuple<T1, T2> b)
		{
			if (a == null)
			{
				return b == null;
			}
			return a.Equals(b);
		}

		public static bool operator !=(STuple<T1, T2> a, STuple<T1, T2> b)
		{
			return !(a == b);
		}
	}
}
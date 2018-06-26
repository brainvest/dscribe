using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Helpers.SpecializedTuples
{
	public class STuple<T1> : IEquatable<STuple<T1>>
	{
		public T1 Item1 { get; set; }

		public bool Equals(STuple<T1> b)
		{
			return b != null &&
				((Item1 == null && b.Item1 == null) || EqualityComparer<T1>.Default.Equals(Item1, b.Item1));
		}

		public override bool Equals(object obj)
		{
			return (obj is STuple<T1> a) && this.Equals(a);
		}

		public override int GetHashCode()
		{
			var hash = 17;
			hash = hash * 23 + (Item1 == null ? 0 : Item1.GetHashCode());
			return hash;
		}

		public static bool operator ==(STuple<T1> a, STuple<T1> b)
		{
			if (a == null)
			{
				return b == null;
			}
			return a.Equals(b);
		}

		public static bool operator !=(STuple<T1> a, STuple<T1> b)
		{
			return !(a == b);
		}
	}
}
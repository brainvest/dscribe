using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Helpers.SpecializedTuples
{
	public class STuple<T1, T2, T3, T4, T5, T6, T7, T8> : IEquatable<STuple<T1, T2, T3, T4, T5, T6, T7, T8>>
	{
		public T1 Item1 { get; set; }
		public T2 Item2 { get; set; }
		public T3 Item3 { get; set; }
		public T4 Item4 { get; set; }
		public T5 Item5 { get; set; }
		public T6 Item6 { get; set; }
		public T7 Item7 { get; set; }
		public T8 Item8 { get; set; }

		public bool Equals(STuple<T1, T2, T3, T4, T5, T6, T7, T8> b)
		{
			return b != null &&
				((Item1 == null && b.Item1 == null) || EqualityComparer<T1>.Default.Equals(Item1, b.Item1)) &&
				((Item2 == null && b.Item2 == null) || EqualityComparer<T2>.Default.Equals(Item2, b.Item2)) &&
				((Item3 == null && b.Item3 == null) || EqualityComparer<T3>.Default.Equals(Item3, b.Item3)) &&
				((Item4 == null && b.Item4 == null) || EqualityComparer<T4>.Default.Equals(Item4, b.Item4)) &&
				((Item5 == null && b.Item5 == null) || EqualityComparer<T5>.Default.Equals(Item5, b.Item5)) &&
				((Item6 == null && b.Item6 == null) || EqualityComparer<T6>.Default.Equals(Item6, b.Item6)) &&
				((Item7 == null && b.Item7 == null) || EqualityComparer<T7>.Default.Equals(Item7, b.Item7)) &&
				((Item8 == null && b.Item8 == null) || EqualityComparer<T8>.Default.Equals(Item8, b.Item8));
		}

		public override bool Equals(object obj)
		{
			return (obj is STuple<T1, T2, T3, T4, T5, T6, T7, T8> b) && this.Equals(b);
		}

		public override int GetHashCode()
		{
			unchecked
			{
				var hash = 17;
				hash = hash * 23 + (Item1 == null ? 0 : Item1.GetHashCode());
				hash = hash * 23 + (Item2 == null ? 0 : Item2.GetHashCode());
				hash = hash * 23 + (Item3 == null ? 0 : Item3.GetHashCode());
				hash = hash * 23 + (Item4 == null ? 0 : Item4.GetHashCode());
				hash = hash * 23 + (Item5 == null ? 0 : Item5.GetHashCode());
				hash = hash * 23 + (Item6 == null ? 0 : Item6.GetHashCode());
				hash = hash * 23 + (Item7 == null ? 0 : Item7.GetHashCode());
				hash = hash * 23 + (Item8 == null ? 0 : Item8.GetHashCode());
				return hash;
			}
		}

		public static bool operator ==(STuple<T1, T2, T3, T4, T5, T6, T7, T8> a, STuple<T1, T2, T3, T4, T5, T6, T7, T8> b)
		{
			if (a == null)
			{
				return b == null;
			}
			return a.Equals(b);
		}

		public static bool operator !=(STuple<T1, T2, T3, T4, T5, T6, T7, T8> a, STuple<T1, T2, T3, T4, T5, T6, T7, T8> b)
		{
			return !(a == b);
		}
	}
}
using System.Collections.Generic;

namespace Brainvest.Dscribe.Helpers
{
	public static class LinqExtensions
	{
		public static IEnumerable<T> SafeUnionAll<T>(this IEnumerable<T> a, params IEnumerable<T>[] others)
		{
			if (a != null)
			{
				foreach (var item in a)
				{
					yield return item;
				}
			}
			if (others != null)
			{
				foreach (var list in others)
				{
					if (list == null)
					{
						continue;
					}
					foreach (var item in list)
					{
						yield return item;
					}
				}
			}
		}
	}
}
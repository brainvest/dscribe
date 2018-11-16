using System;
using System.Collections.Generic;
using System.Linq;

namespace Brainvest.Dscribe.Helpers
{
	public static class MiscHelper
	{
		public static string GetFullMessage(this Exception ex)
		{
			string text = ex.GetType().ToString() + ":" + ex.Message;
			if (ex.InnerException == null)
			{
				return text;
			}
			return text + Environment.NewLine + ex.InnerException.GetFullMessage();
		}

		public static TValue GetOrDefault<TKey, TValue>(this Dictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue = default)
		{
			if (dictionary.TryGetValue(key, out TValue value))
			{
				return value;
			}
			return defaultValue;
		}

		public static TValue GetOrDefault<TKey, TValue>(this Dictionary<TKey, TValue> dictionary, TKey key, Func<TValue> defaultValueGenerator)
		{
			if (dictionary.TryGetValue(key, out TValue value))
			{
				return value;
			}
			return defaultValueGenerator();
		}

		public static IEnumerable<(TEnum value, string name)> GetValues<TEnum>()
		{
			if (!typeof(TEnum).IsEnum)
			{
				throw new ArgumentException($"Type {nameof(TEnum)} should be an enum type.");
			}
			return Enum.GetValues(typeof(TEnum)).Cast<TEnum>()
				.Select(x => (x, Enum.GetName(typeof(TEnum), x))).ToList();
		}

		public static TAttribute GetAttribute<TEnum, TAttribute>(string value)
			where TAttribute : Attribute
		{
			return Attribute.GetCustomAttribute(typeof(TEnum).GetMember(value).FirstOrDefault(), typeof(TAttribute)) as TAttribute;
		}

		public static IEnumerable<T> Concat<T>(this IEnumerable<T> list, T item)
		{
			if (list != null)
			{
				foreach (var x in list)
				{
					yield return x;
				}
			}
			yield return item;
		}
	}
}
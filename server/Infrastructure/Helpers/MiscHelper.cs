using System;
using System.Collections.Generic;
using System.Text;

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

		public static TValue GetOrDefault<TKey, TValue>(this Dictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue = default(TValue))
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
	}
}
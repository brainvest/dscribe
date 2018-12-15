using System;
using System.IO;
using System.IO.Compression;
using System.Text;

namespace Brainvest.Dscribe.Helpers
{
	public static class TextHelper
	{
		public static void CopyTo(Stream src, Stream dest)
		{
			byte[] bytes = new byte[4096];

			int cnt;

			while ((cnt = src.Read(bytes, 0, bytes.Length)) != 0)
			{
				dest.Write(bytes, 0, cnt);
			}
		}

		public static byte[] Zip(string str)
		{
			var bytes = Encoding.UTF8.GetBytes(str);

			using (var msi = new MemoryStream(bytes))
			using (var mso = new MemoryStream())
			{
				using (var gs = new GZipStream(mso, CompressionMode.Compress))
				{
					//msi.CopyTo(gs);
					CopyTo(msi, gs);
				}

				return mso.ToArray();
			}
		}

		public static string Unzip(byte[] bytes)
		{
			using (var msi = new MemoryStream(bytes))
			using (var mso = new MemoryStream())
			{
				using (var gs = new GZipStream(msi, CompressionMode.Decompress))
				{
					//gs.CopyTo(mso);
					CopyTo(gs, mso);
				}

				return Encoding.UTF8.GetString(mso.ToArray());
			}
		}

		public static string SmartSeparate(this string text)
		{
			var builder = new StringBuilder(text.Length * 3 / 2);
			int index = 0;
			while (index < text.Length)
			{
				if (index > 0 && Char.IsLower(text[index - 1]) && Char.IsUpper(text[index]))
				{
					builder.Append(' ');
				}
				builder.Append(text[index++]);
			}
			return builder.ToString();
		}

	}
}
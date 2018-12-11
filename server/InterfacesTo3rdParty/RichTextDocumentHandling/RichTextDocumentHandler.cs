using Brainvest.Dscribe.Abstractions;
using NPOI.XWPF.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.InterfacesTo3rdParty.RichTextDocumentHandling
{
	public class RichTextDocumentHandler : IRichTextDocumentHandler
	{
		Regex regex = new Regex(@"\{\$\.(?<pattern>[a-z,A-Z,.,_,0-9]+)\}", RegexOptions.Compiled);

		public async Task<byte[]> Process(byte[] input, Func<IEnumerable<string>, Task<Dictionary<string, string>>> valueExtractor)
		{
			var expressions = new HashSet<string>();
			var document = new XWPFDocument(new MemoryStream(input));

			foreach (var run in GetRuns(document))
			{
				if (run.Text.Contains("{"))
				{

				}
				regex.Replace(run.Text, match =>
				{
					var pattern = match.Groups["pattern"].Value;
					if (!expressions.Contains(pattern))
					{
						expressions.Add(pattern);
					}
					return pattern;
				});
			}

			var values = await valueExtractor(expressions);

			foreach (var run in GetRuns(document))
			{
				var oldText = run.Text;
				var newText = regex.Replace(oldText, match =>
				{
					var pattern = match.Groups["pattern"].Value;
					return values[pattern];
				});
				if (newText != oldText)
				{
					run.SetText(newText);
				}
			}

			using (var output = new MemoryStream())
			{
				document.Write(output);
				var bytes = new byte[output.Position];
				output.Seek(0, SeekOrigin.Begin);
				output.Read(bytes, 0, bytes.Length);
				return bytes;
			}
		}

		private IEnumerable<XWPFRun> GetRuns(XWPFDocument document)
		{
			return document.Paragraphs.Where(x => x.Runs != null).SelectMany(x => x.Runs)
				.Union(document.Tables.Where(t => t.Rows != null).SelectMany(x => x.Rows)
					.Where(r => r.GetTableCells() != null).SelectMany(r => r.GetTableCells())
					.Where(c => c.Paragraphs != null).SelectMany(c => c.Paragraphs)
					.Where(p => p.Runs != null).SelectMany(p => p.Runs));
		}
	}
}

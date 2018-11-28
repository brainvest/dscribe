using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IRichTextDocumentHandler
	{
		Task<byte[]> Process(byte[] input, Func<IEnumerable<string>, Task<Dictionary<string, string>>> valueExtractor);
	}
}
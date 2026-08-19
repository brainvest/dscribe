namespace Brainvest.Dscribe.Abstractions;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IRichTextDocumentHandler
{
	Task<byte[]> Process(byte[] input, Func<IEnumerable<string>, Task<Dictionary<string, string>>> valueExtractor);
}

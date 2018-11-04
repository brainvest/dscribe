using Brainvest.Dscribe.MetadataDbAccess.Entities;

namespace Brainvest.Dscribe.Metadata
{
	public class ExpressionInfo
	{
		public string MainInputEntityTypeName { get; set; }
		public ExpressionFormatEnum Format { get; internal set; }
		public string Body { get; internal set; }
	}
}
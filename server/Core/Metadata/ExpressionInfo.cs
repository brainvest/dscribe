namespace Brainvest.Dscribe.Metadata;

using Brainvest.Dscribe.MetadataDbAccess.Entities;

public class ExpressionInfo
{
	public string MainInputEntityTypeName { get; set; }
	public ExpressionFormatEnum Format { get; internal set; }
	public string Body { get; internal set; }
}

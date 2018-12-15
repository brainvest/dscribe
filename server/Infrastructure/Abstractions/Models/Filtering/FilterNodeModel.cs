namespace Brainvest.Dscribe.Abstractions.Models.Filtering
{
	public class FilterNodeModel
	{
		public FilterNodeType? NodeType { get; set; }
		public FilterOperator? Operator { get; set; }
		public string DataType { get; set; }
		public object[] Values { get; set; }
		public FilterNodeModel[] Children { get; set; }
		public string PropertyName { get; set; }
		public string ParameterName { get; set; }
	}
}
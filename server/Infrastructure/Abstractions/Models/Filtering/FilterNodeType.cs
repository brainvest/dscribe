namespace Brainvest.Dscribe.Abstractions.Models.Filtering
{
	public enum FilterNodeType
	{
		Logical = 1,
		Comparison,
		Arithmetic,
		Constant,
		NavigationList,
		Lambda,
		Property
	}
}
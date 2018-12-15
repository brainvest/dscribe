namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public interface IPageRequest
	{
		int? StartIndex { get; set; }
		int? Count { get; set; }
	}
}
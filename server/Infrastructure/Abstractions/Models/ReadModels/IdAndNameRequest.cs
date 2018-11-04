namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class IdAndNameRequest
	{
		public string EntityTypeName { get; set; }
		public int[] Ids { get; set; } //TODO: This might not be int[]
	}
}
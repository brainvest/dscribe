namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public class ExpressionValueRequest
	{
		public string EntityTypeName { get; set; }
		public PropertyInfoModel[] Properties { get; set; }
		public int[] Ids { get; set; } //TODO: This might not be int[]
	}
}
namespace Brainvest.Dscribe.Abstractions
{
	public interface IEntityReference
	{
		int EntityTypeId { get; set; }
		int Identifier { get; set; }
	}
}

using System.ComponentModel.DataAnnotations;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class EnumValue
	{
		public int Id { get; set; }

		public int EnumTypeId { get; set; }
		public EnumType EnumType { get; set; }

		public string Name { get; set; }
		[MaxLength(200)]
		public string Identifier { get; set; }
	}
}
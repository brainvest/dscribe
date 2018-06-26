using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class EnumValue
	{
		public int Id { get; set; }

		public int EnumTypeId { get; set; }
		public EnumType EnumType { get; set; }

		public string Name { get; set; }
		public string Identifier { get; set; }
	}
}
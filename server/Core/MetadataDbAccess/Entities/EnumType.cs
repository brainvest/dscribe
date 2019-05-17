using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class EnumType
	{
		public int Id { get; set; }
		public string Name { get; set; }
		[MaxLength(200)]
		public string Identifier { get; set; }

		public ICollection<EnumValue> Values { get; set; }
	}
}
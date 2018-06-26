using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class EnumType
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Identifier { get; set; }

		public ICollection<EnumValue> Values { get; set; }
	}
}
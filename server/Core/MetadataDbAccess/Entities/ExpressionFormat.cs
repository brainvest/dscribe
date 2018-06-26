using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class ExpressionFormat
	{
		public ExpressionFormatEnum Id { get; set; }
		public string Identifier { get; set; }
		public string Title { get; set; }
	}

	public enum ExpressionFormatEnum
	{
		SimplePath = 1,
		Json = 2,
		CSharp = 3
	}
}
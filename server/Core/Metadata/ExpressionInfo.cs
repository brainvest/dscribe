using Brainvest.Dscribe.MetadataDbAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Metadata
{
	public class ExpressionInfo
	{
		public string MainInputEntityName { get; set; }
		public ExpressionFormatEnum Format { get; internal set; }
		public string Body { get; internal set; }
	}
}
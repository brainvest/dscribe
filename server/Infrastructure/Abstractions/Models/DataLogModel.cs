using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Models
{
	public class DataLogModel
	{
		public long Id { get; set; } 
		public string Body { get; set; }
		public DataRequestAction DataRequestAction { get; set; }
		public RequestLogModel RequestLog { get; set; }
		public long RequestLogId { get; set; }
	}
}

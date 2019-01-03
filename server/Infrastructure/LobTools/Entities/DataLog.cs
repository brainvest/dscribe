using Brainvest.Dscribe.Abstractions.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class DataLog
	{
		public long Id { get; set; }
		public string Body { get; set; }
		public DataRequestAction DataRequestAction { get; set; }
		public RequestLog RequestLog { get; set; }
		public long RequestLogId { get; set; }
	}
}

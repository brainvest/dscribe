using Brainvest.Dscribe.Abstractions;
using System;
using System.Collections.Generic;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class RequestLog
	{
		public long Id { get; set; }

		public DateTime StartTime { get; set; }
		public Guid? UserId { get; set; }
		public string Path { get; set; }
		public string QueryString { get; set; }
		public string Method { get; set; }
		public string Body { get; set; }
		public long? RequestSize { get; set; }
		public string IpAddress { get; set; }

		public int? EntityTypeId { get; set; }
		public int? PropertyId { get; set; }
		public int? AppTypeId { get; set; }
		public int? AppInstanceId { get; set; }
		//public ActionTypeEnum? ActionTypeId { get; set; }

		public string ProcessDuration { get; set; }
		public bool Failed { get; set; }
		public bool HadException { get; set; }
		public string Response { get; set; }
		public int ResponseStatusCode { get; set; }
		public long? ResponseSize { get; set; }

		public string ExceptionTitle { get; set; }
		public string ExceptionMessage { get; set; }

		public List<DataLog> DataLogs { get; set; }
										   //public ICollection<RequestException> Exceptions { get; set; }
										   //public ICollection<EntityChangeLog> EntityChanges { get; set; }
	}
}
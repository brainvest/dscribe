using Brainvest.Dscribe.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class EntityChangeLog
	{
		public int Id { get; set; }

		public int EntityTypeId { get; set; }
		public int Identifier { get; set; }

		public long? RequestId { get; set; }
		[ForeignKey(nameof(RequestId))]
		public RequestLog Request { get; set; }

		public ActionTypeEnum ActionTypeId { get; set; }
		public string NewValues { get; set; }
		public string OldValues { get; set; }
	}
}
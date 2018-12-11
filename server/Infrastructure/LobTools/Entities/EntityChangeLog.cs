using Brainvest.Dscribe.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class EntityChangeLog : IEntityReference, IRequestReference
	{
		public int Id { get; set; }

		public int EntityTypeId { get; set; }
		public int Identifier { get; set; }

		public long? RequestLogId { get; set; }
		[ForeignKey(nameof(RequestLogId))]
		public RequestLog RequestLog { get; set; }

		public ActionTypeEnum ActionTypeId { get; set; }
		public string NewValues { get; set; }
		public string OldValues { get; set; }
	}
}
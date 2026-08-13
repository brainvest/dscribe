namespace Brainvest.Dscribe.LobTools.Entities;

using System.ComponentModel.DataAnnotations.Schema;
using Brainvest.Dscribe.Abstractions;

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

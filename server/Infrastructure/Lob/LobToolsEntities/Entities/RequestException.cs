namespace Brainvest.Dscribe.LobTools.Entities;

using System.ComponentModel.DataAnnotations.Schema;

public class RequestException
{
	public int Id { get; set; }

	public long RequestId { get; set; }
	[ForeignKey(nameof(RequestId))]
	public RequestLog Request { get; set; }

	public int ExceptionId { get; set; }
	[ForeignKey(nameof(ExceptionId))]
	public ProcessingException Exception { get; set; }

	public bool CausedFailure { get; set; }
}

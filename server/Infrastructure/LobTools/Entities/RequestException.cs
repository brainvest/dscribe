using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class RequestException
	{
		public int Id { get; set; }

		public int RequestId { get; set; }
		[ForeignKey(nameof(RequestId))]
		public RequestLog Request { get; set; }

		public int ExceptionId { get; set; }
		[ForeignKey(nameof(ExceptionId))]
		public ProcessingException Exception { get; set; }

		public bool CausedFailure { get; set; }
	}
}
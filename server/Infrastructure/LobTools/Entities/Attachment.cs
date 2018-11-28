using Brainvest.Dscribe.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class Attachment : IEntityReference, IRequestReference
	{
		public int Id { get; set; }

		public int EntityTypeId { get; set; }
		public int Identifier { get; set; }

		public long? RequestLogId { get; set; }
		[ForeignKey(nameof(RequestLogId))]
		public RequestLog Request { get; set; }

		public bool IsDeleted { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }

		public byte[] Data { get; set; }
		public string Url { get; set; }
	}
}
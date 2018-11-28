using Brainvest.Dscribe.Abstractions;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class Comment : IEntityReference, IRequestReference
	{
		public int Id { get; set; }

		public int EntityTypeId { get; set; }
		public int Identifier { get; set; }

		public long? RequestLogId { get; set; }

		public string Title { get; set; }
		public string Description { get; set; }
	}
}
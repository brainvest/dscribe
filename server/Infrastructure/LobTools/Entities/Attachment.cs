using Brainvest.Dscribe.Abstractions;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class Attachment : IEntityReference
	{
		public int Id { get; set; }

		public int EntityTypeId { get; set; }
		public int Identifier { get; set; }

		public bool IsDeleted { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }

		public string FileName { get; set; }
		public long Size { get; set; }

		public byte[] Data { get; set; }
		public string Url { get; set; }
	}
}
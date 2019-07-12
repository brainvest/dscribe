using System;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class User
	{
		public Guid Id { get; set; }
		public string ExternalUserId { get; set; }
		public string UnifiedExternalUserId { get; set; }
		public string UserName { get; set; }
	}
}
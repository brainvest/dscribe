namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models
{
	public class ClientInfo
	{
		public string ClientId { get; set; }
		public string ClientName { get; set; }
		public string RedirectUri { get; set; }
		public string SilentRefreshUri { get; set; }
		public string PostLogoutRedirectUri { get; set; }
	}
}
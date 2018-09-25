namespace Brainvest.Dscribe.Identity.Server.Host.Models
{
	public class ClientInfo
	{
		public string ClientId { get; set; }
		public string ClientName { get; set; }
		public string RedirectUri { get; set; }
		public string PostLogoutRedirectUri { get; set; }
	}
}
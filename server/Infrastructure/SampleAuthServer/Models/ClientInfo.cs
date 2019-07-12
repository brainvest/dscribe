namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models
{
	public class ClientInfo
	{
		public string ClientId { get; set; }
		public string ClientName { get; set; }
		public string Description { get; set; }
		public string ImageUrl { get; set; }
		public string[] RedirectUris { get; set; }
		public string[] SilentRefreshUris { get; set; }
		public string[] PostLogoutRedirectUris { get; set; }
	}
}
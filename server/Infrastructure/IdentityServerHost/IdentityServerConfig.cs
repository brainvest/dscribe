using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Identity.Server.Host
{
	public class IdentityServerConfig
	{
		public static IEnumerable<ApiResource> GetApiResources()
		{
			return new List<ApiResource>
			{
				new ApiResource("testapi", "Test Api")
			};
		}

		public static IEnumerable<IdentityResource> GetIdentityResources()
		{
			return new List<IdentityResource>
			{
					new IdentityResources.OpenId(),
					new IdentityResources.Profile(),
			};
		}

		public static IEnumerable<Client> GetClients()
		{
			return new List<Client>
			{
				new Client
				{
					ClientId = "dscribe",
					ClientName = "dscribe",
					AllowedGrantTypes = GrantTypes.ImplicitAndClientCredentials,
					RequireConsent = false,
					RedirectUris = { "http://localhost:4200/auth-callback" },
					PostLogoutRedirectUris = { "http://localhost:4200/" },
					AllowedScopes = new List<string>
					{
							IdentityServerConstants.StandardScopes.OpenId,
							IdentityServerConstants.StandardScopes.Profile
					},
					AllowOfflineAccess = true,
					AllowAccessTokensViaBrowser = true
				}
			};
		}
	}
}
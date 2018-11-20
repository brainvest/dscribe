using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;
using System.Linq;

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer
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
					new IdentityResource("roles", "Roles", new List<string>(){ JwtClaimTypes.Role })
			};
		}

		public static IEnumerable<Client> GetClients(IEnumerable<ClientInfo> clients)
		{
			return clients.Select(x => new Client
			{
				ClientId = x.ClientId,
				ClientName = x.ClientName,
				AllowedGrantTypes = GrantTypes.Implicit,
				RequireConsent = false,
				RedirectUris = { x.RedirectUri, x.SilentRefreshUri },
				PostLogoutRedirectUris = { x.PostLogoutRedirectUri },
				AllowedScopes = new List<string>
					{
							IdentityServerConstants.StandardScopes.OpenId,
							IdentityServerConstants.StandardScopes.Profile,
							"roles"
					},
				AllowedCorsOrigins = new List<string> { x.PostLogoutRedirectUri },
				AllowOfflineAccess = true,
				AllowAccessTokensViaBrowser = true,
				AlwaysIncludeUserClaimsInIdToken = true,
				AccessTokenLifetime = 300
			});
		}
	}
}
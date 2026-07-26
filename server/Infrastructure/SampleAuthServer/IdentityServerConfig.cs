using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Duende.IdentityServer;
using Duende.IdentityServer.Models;

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
					new IdentityResource("roles", "Roles", new List<string>(){ ClaimTypes.Role })
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
				RedirectUris = x.RedirectUris.SafeUnionAll(x.SilentRefreshUris).ToList(),
				PostLogoutRedirectUris = x.PostLogoutRedirectUris.ToList(),
				AllowedScopes = new List<string>
					{
							IdentityServerConstants.StandardScopes.OpenId,
							IdentityServerConstants.StandardScopes.Profile,
							"roles"
					},
				AllowedCorsOrigins = x.PostLogoutRedirectUris.Select(s => new Uri(s).GetLeftPart(UriPartial.Authority)).ToList(),
				AllowOfflineAccess = true,
				AllowAccessTokensViaBrowser = true,
				AlwaysIncludeUserClaimsInIdToken = true,
				AccessTokenLifetime = 300
			});
		}
	}
}
namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Brainvest.Dscribe.Helpers;
using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using Duende.IdentityServer;
using Duende.IdentityServer.Models;

public class IdentityServerConfig
{
	public static IEnumerable<ApiResource> GetApiResources()
	{
		return
		[
			new ApiResource("testapi", "Test Api")
		];
	}

	public static IEnumerable<IdentityResource> GetIdentityResources()
	{
		return
		[
				new IdentityResources.OpenId(),
				new IdentityResources.Profile(),
				new IdentityResource("roles", "Roles", [ClaimTypes.Role])
		];
	}

	public static IEnumerable<Client> GetClients(IEnumerable<ClientInfo> clients)
	{
		return clients.Select(x => new Client
		{
			ClientId = x.ClientId,
			ClientName = x.ClientName,
			AllowedGrantTypes = GrantTypes.Implicit,
			RequireConsent = false,
			RedirectUris = [.. x.RedirectUris.SafeUnionAll(x.SilentRefreshUris)],
			PostLogoutRedirectUris = [.. x.PostLogoutRedirectUris ?? []],
			AllowedScopes =
				[
						IdentityServerConstants.StandardScopes.OpenId,
						IdentityServerConstants.StandardScopes.Profile,
						"roles"
				],
			AllowedCorsOrigins = [.. (x.PostLogoutRedirectUris ?? []).Select(s => new Uri(s).GetLeftPart(UriPartial.Authority))],
			AllowOfflineAccess = true,
			AllowAccessTokensViaBrowser = true,
			AlwaysIncludeUserClaimsInIdToken = true,
			AccessTokenLifetime = 300
		});
	}
}

# Open items

Rough priority order; to be completed.

1. **Confirm the real auth path.** Run the suite once against the real `SampleAuthServer` with an existing Admin user
   (see [e2e-testing.md](e2e-testing.md)). Decide whether a dedicated e2e user in a non-shared Auth database is wanted.
2. **Per-machine configuration.** `ImplementationsDirectory` / `TempDirectory` in `Host/appsettings.Development.json` are Linux paths;
   developers must override them (environment variables or user secrets). Regenerating an assembly without a Host restart
   works (finding 6); a changed assembly with different content has not been tried, and old versions are never unloaded.
3. **Entity data in the client.** The API works (see finding 6). List (grid) with paging/sort/filter, create, edit, delete per entity type; foreign key
   lookups; navigation lists. The core already contains the filter/sort/group request models from the old client.
4. **Replace sample content.** The admin products pages, the ribbon, the end-user collection/catalog pages, the drawer's
   sample items, "My collection" in the top bar and the "Company" label are template content.
5. **Persist the chosen application** (it is in memory only, so a reload returns to "Select application") and decide
   which application opens by default.
6. **Icon information** for application instances (`AppInstanceInformation.icon`) is not provided by the API.
7. ~~Fix the NuGet advisory~~ done (see finding 4). Consider replacing the legacy `Microsoft.AspNetCore.Http 2.x` package
   (and `SaasKit.Multitenancy`, which depends on it) because it will be flagged again.
8. **Server tests.** `server/Tests/*` are empty; at least cover the metadata JSON shape (regression for finding 1).
9. **Review serialization** across the other controllers now that Newtonsoft is back (entity endpoints, LobTools history,
   release metadata) against the client's expectations.
10. **CI** for the Playwright suite.

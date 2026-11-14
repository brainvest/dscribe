# Open items

Rough priority order; to be completed.

1. **Confirm the real auth path.** Run the suite once against the real `SampleAuthServer` with an existing Admin user
   (see [e2e-testing.md](e2e-testing.md)). Decide whether a dedicated e2e user in a non-shared Auth database is wanted.
2. **Business assembly for app instances.** Make `ImplementationsDirectory` configurable per developer machine (the checked-in
   value is a Linux path) and run the release flow for `Demo4Caroline`, so entity data endpoints work.
3. **Entity data in the client.** List (grid) with paging/sort/filter, create, edit, delete per entity type; foreign key
   lookups; navigation lists. The core already contains the filter/sort/group request models from the old client.
4. **Replace sample content.** The admin products pages, the ribbon, the end-user collection/catalog pages, the drawer's
   sample items, "My collection" in the top bar and the "Company" label are template content.
5. **Persist the chosen application** (it is in memory only, so a reload returns to "Select application") and decide
   which application opens by default.
6. **Icon information** for application instances (`AppInstanceInformation.icon`) is not provided by the API.
7. **Fix the NuGet advisory** (`Microsoft.AspNetCore.WebUtilities 2.3.12`) so no `NuGetAudit=false` is needed.
8. **Server tests.** `server/Tests/*` are empty; at least cover the metadata JSON shape (regression for finding 1).
9. **Review serialization** across the other controllers now that Newtonsoft is back (entity endpoints, LobTools history,
   release metadata) against the client's expectations.
10. **CI** for the Playwright suite.

# Work log

## Before this session (by the repository owner)

Reconstructed from the git history and the owner's description; please correct or extend.

- The `master` branch is the 2022 implementation (ASP.NET Core server plus the old Angular client). It worked in 2022.
- The server was upgraded to .NET 10 and cleaned up (file-scoped namespaces, primary constructors, centralized NuGet
  versions, multi-DBMS support with PostgreSQL migrations for Auth, Metadata and LobTools).
- The old client was deleted and a new one started in `client/` as a pnpm workspace:
  - `packages/core` (`@waltzar/core`): framework-independent state, models and HTTP helpers, ported from the old client.
  - `packages/angular-app`: the Angular UI (login, an admin ribbon shell, an end-user drawer shell, theming), moved to Vite.
  - `packages/angular-app/projects/waltzar/angular-lib`: shared Angular components (`remote-region`, `remote-overlay`).
- The login flow was reworked: `SampleAuthServer` exposes `/auth/login|refresh|logout`; the access token lives in memory
  and the session in an `HttpOnly` refresh cookie.
- The end-user shell lists the application instances from the Host and has an app switcher.
- Branch `reimplement-client` holds this work; the last commits were "Add grid view for end user's view" and
  "Fix all typescript errors".

## Verification session (branch `verify-client-playwright`, from `reimplement-client`)

Goal from the owner: check that every feature works, with Playwright tests, and that all forms in the metadata of the
Caroline demo (`Demo4Caroline`, app instance 1) can be seen.

Done by Claude:

1. Created the branch `verify-client-playwright` from `reimplement-client`.
2. Started the Host and `SampleAuthServer` locally, read the connection strings from the two
   `appsettings.Development.json` files, and inspected the databases **read-only** (users, roles, permissions, entity types).
3. Found that the client did not yet show any metadata-driven form, and that the backend serialized metadata as `{}`
   (see [findings-and-decisions.md](findings-and-decisions.md)).
4. Backend: restored Newtonsoft.Json serialization in `server/Host/Startup.cs` (camelCase property names, dictionary
   keys untouched). Ran `GenerateCode` for Caroline to produce its business assembly and confirmed the entity endpoints return
   data from `CarolineMain`; added `ImplementationFactory.Evict` so a freshly generated assembly is used without a restart.
5. Client core (`@waltzar/core`): added the `AppInstance` request header and a GET helper, loading of the metadata when
   the active application changes, fixed the camelCase mismatches and the duplicated entity types in the ported models.
6. Client UI: `ActiveApp` service, a Forms index page, a metadata-driven entity form page, the application's forms in
   the drawer, `aria-label`s on the account and notification buttons.
7. Added the Playwright suite (14 tests) with a test-only auth server, and ran it against the real Host and the real
   Metadata and Caroline databases: 14 passed. Production build and workspace typecheck pass.
8. Wrote this documentation.

Not done / deliberately not done:

- No write was made to the shared DigitalOcean databases (`GenerateCode` only reads them and writes files locally;
  `MigrateDatabase` was never called). An attempt to insert a test user was blocked by the
  environment's permission system and was not worked around; the suite uses a fake auth server instead.
- The real `SampleAuthServer` login path was not exercised end to end (no known credentials).
- Nothing was committed; all changes are in the working tree of `verify-client-playwright`.

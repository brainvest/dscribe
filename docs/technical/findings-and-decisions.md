# Findings and decisions

## 1. Metadata endpoints returned `{}` for every entity type (fixed)

**Symptom.** `GET /api/Metadata/GetComplete` returned the 8 entity names of Caroline, each with an empty object.

**Cause.** The commit "Client working to show a list of application instances" removed `AddNewtonsoftJson(...)` from
`Host/Startup.cs`. `IEntityTypeMetadataModel` is an empty marker interface and `MetadataModel` uses Newtonsoft
attributes and runtime-type serialization (`PropertyFacet<T>` behind an abstract base, etc.). System.Text.Json
serializes by declared type, so the data was dropped.

**Fix.** `services.AddControllers().AddNewtonsoftJson(...)` with a `DefaultContractResolver` using
`CamelCaseNamingStrategy { ProcessDictionaryKeys = false }`: property names are camelCase (what the new client's
response models expect) while dictionary keys such as `RawMaterial` keep their casing (they are looked up by name).

**Alternative considered.** Polymorphic System.Text.Json (`[JsonDerivedType]`) on the interfaces and facets. More
invasive and the code base is written against Newtonsoft (`HeavyOrmObjectGraphHandler`, `EntityHelper`, LobTools).

## 2. Ported client models disagreed with the camelCase API (fixed)

- `EntityTypeMetadataImplementation.setProperties` read `t.Properties` / `defaultFacets.Defaults` (PascalCase, from the
  old client); the API sends `properties` / `defaults`.
- The server sends `entityGeneralUsageCategoryId`; the client read `typeGeneralUsageCategoryId`.
- Every entity type was added to the result twice (`setProperties` and `extractEntityTypeMetadata` both pushed); this
  surfaced as Angular warning NG0955 and 16 cards instead of 8.

## 3. Nothing fetched metadata after choosing an application (implemented)

`switchActiveAppInstance` only stored the choice. It now loads `GET api/metadata/getComplete` with the `AppInstance`
header; the state is `LazyRemoteData<MetadataModel>` (loading / loaded / error). A request counter drops a slow response
that belongs to an earlier choice.

## 4. Build and restore failed on a NuGet advisory (fixed)

`Microsoft.AspNetCore.WebUtilities` (transitive through the legacy `Microsoft.AspNetCore.Http 2.x` and
`SaasKit.Multitenancy`) has a known advisory (GHSA-6527-9fp8-r4x6); the repo treats warnings as errors, so restore failed
with NU1902 (also in VS Code's C# Dev Kit: "Failed to restore NuGet packages for the solution").

**Fix.** `Directory.Packages.props` now has `Microsoft.AspNetCore.Http 2.3.14` and `Microsoft.AspNetCore.WebUtilities
2.3.14`, and the two projects that reference `Http` (`Runtime`, `EfCore.BusinessDataAccess`) also reference
`WebUtilities` directly, so the patched version wins over the transitive 2.3.13. The whole solution builds with 0
warnings, and the e2e setup no longer passes `-p:NuGetAudit=false`.

## 5. Host configuration paths are Linux-only on this machine

`GlobalConfiguration.ImplementationsDirectory` / `TempDirectory` in `Host/appsettings.Development.json` point at
`/home/ali/...`. The e2e setup overrides them with environment variables (`GlobalConfiguration__...`) instead of
editing the checked-in file.

## 6. The business assembly is generated from the metadata (verified, one fix)

Correction of an earlier note: the business assembly is **not** compiled by hand. `POST api/ReleaseMetadata/GenerateCode`
(header `AppInstance`, role with `ManageMetadata`) generates `source.cs` and `<instance>.dll` into
`GlobalConfiguration.ImplementationsDirectory/<instance name>/` from the metadata; it only reads the Metadata database.
`BusinessAssemblyBridge` loads that DLL when an application's container is first created. The Host log line
`The directory ...\Demo4Caroline was not found` / `Business assembly not loaded` therefore only meant "not generated yet on
this machine" (the configured directory is a Linux path from the original developer's machine).

Verified for Caroline (app instance 1): generation succeeds on .NET 10 (Roslyn), the DLL loads, and
`POST api/Entity/GetByFilter` / `CountByFilter` return rows from `CarolineMain` that match the database
(`MeasurementUnit` -> `[{"code":1,"id":1,"name":"Kilograms"}]`; the other seven tables were empty when checked).

**Fix.** `ImplementationFactory` caches one container per app instance forever, including one created while the assembly
did not exist yet, so a Host restart was needed after generating. `GenerateCode` now calls the new
`ImplementationFactory.Evict(appInstanceId)` after a successful generation, so the next request builds a fresh container
with the new assembly.

**Second fix (found by the e2e suite).** The first version of this fix broke when the Host had *already* loaded an
assembly: regenerating produced another `Demo4Caroline`, and the default load context refuses a second assembly with the
same name (`FileLoadException: Assembly with same name is already loaded`), leaving a container without a business
assembly (`KeyNotFoundException: MeasurementUnit` in `BusinessReflector`). `BusinessAssemblyBridge.LoadAssemblyFromPath`
now loads every generated DLL into its own `AssemblyLoadContext` (not collectible, because EF Core caches models by
type), so regenerating works without a Host restart. Old versions stay in memory until the process ends.

The e2e suite generates the assembly in its global setup (see [e2e-testing.md](e2e-testing.md)). `MigrateDatabase` is never
called: it can change the business database.

## 7. Authentication in the tests (decision)

The Auth database is shared and remote and holds one real user. Writing a test user was not acceptable, so the suite
uses `client/e2e/support/fake-auth-server.mjs`, a ~100-line test-only server on port 5001 that implements the same
`/auth/*` contract plus OIDC discovery and JWKS. The real Host validates its tokens (issuer `http://localhost:5001`) and
the token carries the `Admin` role, which the Metadata database's allow-all permission row matches. It must never be used
outside tests (public credentials, ephemeral key).

## 8. Smaller notes

- The icon buttons for Account and Notifications had only a tooltip; `aria-label`s were added.
- `AppInstanceInformation.icon` is not sent by the server; it is now optional and the UI falls back to `apps`.
- The page title in the end-user top bar still says "My collection" (sample content); the catalog/collection pages,
  the admin products pages and the ribbon are sample data from the UI template, not backed by the API.
- `client/dist/` and `server/Infrastructure/SampleAuthServer/keys/*.json` were untracked before this session and were
  left alone.
- There are no server tests in the repository (`server/Tests/*` are empty).

## Assumptions made

- "All forms in metadata for Caroline" means one form per entity type of app instance 1 (8 of them), listed from the
  live metadata, each rendered from its own property definitions.
- An insert form shows the properties not hidden by the metadata's `HideInInsert` facet; required follows `!isNullable`.
- Foreign keys are plain numeric inputs for now (no lookup), because lookups need entity data (see 6).
- Coding conventions followed: `.editorconfig` (tabs, single quotes in TypeScript, 120 columns, file-scoped namespaces,
  usings inside the namespace for C#), Angular standalone components with signals and the new control flow.

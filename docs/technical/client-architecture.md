# Client architecture: from login to a metadata-driven form

```
Login page ──POST /auth/login──▶ SampleAuthServer ──▶ access token (memory) + refresh cookie (/auth, HttpOnly)
    │
    ▼
/admin (role Admin) or /app (any role; admins may visit)
    │
User shell ── availableAppInstances$ ◀── POST api/appManagement/getAppInstancesInfoForHome (anonymous)
    │ pick an application in the switcher
    ▼
WaltzarState.switchActiveAppInstance(app)
    ├─ activeAppInstance$ ← app
    └─ metadataPackage$   ← loading… ──GET api/metadata/getComplete (+ AppInstance header, Bearer token)──▶ loaded | error
    │
    ▼
ActiveApp (signals) ──▶ forms() ──▶ drawer links + /app/forms cards
    │
    ▼
/app/forms/:entityTypeName → EntityForm → fields from getPropertiesForManage(Insert)
```

## Packages

- `packages/core` (`@waltzar/core`) – no Angular dependency. `WaltzarStateImplementation` owns the application
  instances, the active instance and its metadata as `LazyRemoteData` (not_loaded / loading / loaded / error).
  `helpers/http.ts` builds requests (token from `AuthenticationState.tokenProvider()`, optional `AppInstance` header).
  `MetadataModel` turns the server's metadata into `EntityTypeMetadata` / `PropertyMetadata` objects (default facets
  merged with local facets).
- `packages/angular-app` – the UI. `app.config.ts` provides `WALTZAR_STATE`. `core/active-app.ts` exposes it as signals.
- `projects/waltzar/angular-lib` – `remote-region` / `remote-overlay` render a `LazyRemoteData` with loading and error
  overlays (used by the drawer's application switcher).

## Server contract used so far

| Call | Auth | Notes |
| --- | --- | --- |
| `POST /auth/login`, `/auth/refresh`, `/auth/logout` | cookie | `SampleAuthServer`, proxied by Vite |
| `POST api/appManagement/getAppInstancesInfoForHome` | none | list of application instances |
| `GET api/metadata/getComplete` | Bearer + `AppInstance` | `{propertyDefaults, entityTypes}`; JSON is camelCase for property names, dictionary keys keep their casing |

The Host selects the tenant (application instance) from the `AppInstance` header and authorizes through the
`Permissions` / `Roles` tables of the Metadata database, matching the `role` claim of the token.

## Form rendering rules (`entity-form.ts`)

| Metadata | Editor |
| --- | --- |
| `string` | text input |
| `int`, `long`, `short`, `byte`, `decimal`, `double` | number input |
| `bool` | checkbox |
| `Date`, `DateTime`, `DateTimeOffset` | date input |
| `ForeignKey` | number input with a hint naming the related entity (lookup to come) |

Which properties appear comes from the metadata itself: facets `HideInInsert` / `HideInEdit` (defaults per general
usage category, overridable per property). Required = `!isNullable`.

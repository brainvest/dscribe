# End-to-end testing (Playwright)

Location: `client/e2e`, configuration in `client/playwright.config.ts`.

## Running

```
cd client
pnpm e2e                                   # all tests
npx playwright test e2e/auth.spec.ts       # one file
npx playwright test --headed --debug       # watch it run
pnpm e2e:report                            # HTML report (client/e2e/report)
```

`playwright.config.ts` starts three servers and reuses them when they are already listening (outside CI):

| Server | Port | Command |
| --- | --- | --- |
| Test auth server | 5001 | `node e2e/support/fake-auth-server.mjs` |
| Host (real, against the configured Metadata DB) | 5000 | `dotnet run --project ../server/Host/Host.csproj` |
| Angular client (Vite, proxies `/auth` to 5001 and `/api` to 5000) | 4200 | `pnpm start` |

The Host's implementations directory is `client/e2e/.implementations` (git-ignored). The global setup
(`e2e/support/global-setup.ts`) calls `POST /api/ReleaseMetadata/GenerateCode` for Caroline before the tests, which generates the
business assembly from the metadata.

The Host needs network access to the database configured in `server/Host/appsettings.Development.json`. The first
request for an application is slow (the Host loads its metadata), hence the generous timeouts.

Credentials of the test auth server: `e2e-admin` / `e2e-password` (override with `E2E_USERNAME` / `E2E_PASSWORD`).

## What is covered

`auth.spec.ts`
- home page offers sign-in
- wrong credentials show "That username and password do not match."
- an admin lands in `/admin`
- anonymous visitors cannot reach `/app/...`
- the session survives a reload (refresh cookie) and ends on sign-out

`caroline-forms.spec.ts` (app instance 1, `Demo4Caroline`)
- both application instances are offered in the switcher
- nothing is listed before an application is picked
- every form of the metadata is listed as a card and as a drawer link; the expected list is fetched from
  `GET /api/Metadata/GetComplete` independently of the UI, not hard-coded
- each form opens, shows its title and every editable field defined by its metadata, and the card's field count matches
- a form opens from the drawer
- a deep link without a picked application asks for one

`entity-data.spec.ts` (API level, guards the backend the future grids rely on)
- every entity type of Caroline can be listed and counted through the generated business assembly (`CarolineMain`)
- rows use the metadata's property names in camelCase
- requests without a token get 401

Screenshots: `client/e2e/screenshots/` (`caroline-forms-index.png`, `form-<EntityName>.png`), ignored by git. Playwright
also attaches a screenshot to every test in the HTML report, and keeps traces of failures.

## Design notes

- Selectors use `data-testid` for generated content (cards, drawer links, fields) and roles/labels for static UI.
- The suite never writes to the shared databases. Auth is replaced by the fake server (see
  [findings-and-decisions.md](findings-and-decisions.md), item 7); to test against the real `SampleAuthServer`, start it
  on port 5001 instead and set `E2E_USERNAME` / `E2E_PASSWORD` to an existing user with the `Admin` role.
- Tests are independent and run on one worker because they share the Host's in-memory state.

## To add

- Entity data in the UI (list / create / edit); the API side is already covered.
- The admin console pages once they are backed by the API.
- A CI job (needs a database reachable from the runner).

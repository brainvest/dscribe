# Technical documentation

Working notes for the Dscribe re-implementation (BPMS + ERP builder: metadata-defined entity types, database
definitions, forms generated from metadata). These documents are meant to be completed over time.

| Document | What it covers |
| --- | --- |
| [work-log.md](work-log.md) | Who did what: the re-implementation so far, and the verification session (branch `verify-client-playwright`). |
| [findings-and-decisions.md](findings-and-decisions.md) | Problems found while verifying, how each was fixed or worked around, and the assumptions made. |
| [e2e-testing.md](e2e-testing.md) | How to run the Playwright suite, what it covers, and how the test stack is wired. |
| [client-architecture.md](client-architecture.md) | How the Angular client gets from login to a metadata-driven form. |
| [open-items.md](open-items.md) | What is not done yet, in rough priority order. |

## Quick start (local)

Prerequisites: .NET 10 SDK, Node 22, pnpm.

```
cd client
pnpm install
npx playwright install chromium
pnpm e2e            # starts the test auth server, the Host and the Vite dev server if they are not running
pnpm e2e:report     # opens the HTML report
```

Screenshots of every Caroline form are written to `client/e2e/screenshots/` on each run.

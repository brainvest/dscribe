# UI Template

An Angular 22 + Angular Material starter for an application with two distinct
faces: a dense **admin console** with Office-style ribbon navigation, and a
friendlier **end-user app** with a drawer. Each has its own route prefix, its
own palette, and its own light/dark preference.

```
npm start        # dev server on http://localhost:4200
npm run build    # production build
```

## The two areas

|            | Admin                            | End user                     |
| ---------- | -------------------------------- | ---------------------------- |
| Prefix     | `/admin`                         | `/app`                       |
| Navigation | Ribbon: tabs → groups → commands | Drawer with sections         |
| Palette    | Azure, low chroma, `density: -2` | Magenta/orange, `density: 0` |
| Corners    | 4px                              | 16px                         |
| Shell      | `layout/admin-shell`             | `layout/user-shell`          |

Both shells link to each other (the admin title bar has an "open in new" icon;
the drawer has an "Admin console" entry at the bottom), so you can move between
them without editing the URL.

## What is actually implemented

Exactly one menu item per area navigates to a real screen; every other item is
a sample. Placeholder commands raise a snackbar, and unknown child routes land
on an area-specific "nothing here yet" page.

- **Admin → Home → Products** (`/admin/products`): the CRUD sample.
  - `mat-table` with a sticky header, row selection, sorting on most columns,
    and a paginator (10/25/50/100).
  - A collapsible **filter panel**: free-text search over name/SKU/category,
    multi-select category and status, an in-stock toggle, and a clear button
    with an active-filter count.
  - An **activity column** showing attachment and comment counts as icon +
    number, dimmed when zero.
  - A **selection-aware toolbar**: ticking rows reveals the selection count, a
    **View history** button (deliberately inert — it opens a snackbar), a bulk
    delete, and a clear-selection action.
  - Add/edit at `/admin/products/new` and `/admin/products/:id`, with reactive
    form validation; delete goes through a confirmation dialog.
- **End user → My collection** (`/app/collection`): a grid of cards that rotate
  on click to a larger back face with more detail. Only one card is open at a
  time, and the open card spans two grid tracks.

## Theming

`core/theme.ts` owns two independent axes:

- **area** — toggles `.area-admin` / `.area-user` on `<html>`. Each class has
  its own `mat.theme()` block in `src/styles.scss` plus a few app-level custom
  properties (`--app-shell-bg`, `--app-chrome-bg`, `--app-accent-bar`,
  `--app-radius`).
- **mode** — sets `color-scheme` on `<html>`. Angular Material emits every
  colour as `light-dark(…)`, so one property flips the whole palette. The
  choice is remembered per area, so the admin can sit in dark while the
  end-user app stays light.

Each shell calls `theme.useArea(...)` in its constructor, so navigating between
`/admin` and `/app` re-themes the page.

## Notes for extending it

- The app is **zoneless** (no `zone.js`). Anything the template reads must be a
  signal, or the view will not update — the grid's row selection is a
  `signal<ReadonlySet<number>>` for exactly this reason.
- Menu content lives in `core/navigation.ts` (`ADMIN_RIBBON`, `USER_DRAWER`);
  a command navigates if it has a `link` and is otherwise a placeholder.
- `admin/data/product.ts` is an in-memory store built on signals. Swap the
  method bodies for HTTP calls and the components need no changes.
- Icons come from Material Symbols Outlined, set as the default `fontSet` in
  `app.config.ts`.

import { Routes } from '@angular/router';
import { anonymousGuard, roleGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./public/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    canActivate: [anonymousGuard],
    loadComponent: () => import('./public/login/login').then((m) => m.Login),
  },
  {
    path: 'admin',
    canActivate: [roleGuard('admin')],
    loadComponent: () => import('./layout/admin-shell/admin-shell').then((m) => m.AdminShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      {
        path: 'products',
        loadComponent: () =>
          import('./admin/pages/products-list/products-list').then((m) => m.ProductsList),
      },
      {
        path: 'products/new',
        loadComponent: () =>
          import('./admin/pages/product-form/product-form').then((m) => m.ProductForm),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./admin/pages/product-form/product-form').then((m) => m.ProductForm),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./admin/pages/placeholder-page/placeholder-page').then((m) => m.PlaceholderPage),
      },
    ],
  },
  {
    path: 'app',
    // Admins may look at the end-user area too; end users stay out of /admin.
    canActivate: [roleGuard('user', 'admin')],
    loadComponent: () => import('./layout/user-shell/user-shell').then((m) => m.UserShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'collection' },
      {
        path: 'collection',
        loadComponent: () => import('./user/pages/catalog/catalog').then((m) => m.Catalog),
      },
      {
        path: 'collection/new',
        loadComponent: () =>
          import('./user/pages/collection-form/collection-form').then((m) => m.CollectionForm),
      },
      {
        path: 'collection/:id',
        loadComponent: () =>
          import('./user/pages/collection-form/collection-form').then((m) => m.CollectionForm),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./user/pages/placeholder-page/placeholder-page').then((m) => m.PlaceholderPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from './auth-api';
import { Auth } from './auth';

/**
 * Lets in signed-in users holding one of `roles`. Anonymous visitors go to
 * the login page (remembering where they were headed); signed-in users of
 * another role go to their own area.
 */
export function roleGuard(...roles: Role[]): CanActivateFn {
  return (_route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    const role = auth.role();

    if (!role) {
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return roles.includes(role) ? true : router.parseUrl(auth.homeUrl());
  };
}

/** Keeps signed-in users off the login page. */
export const anonymousGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  return auth.isAuthenticated() ? inject(Router).parseUrl(auth.homeUrl()) : true;
};

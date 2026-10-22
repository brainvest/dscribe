import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Auth } from './auth';

/** The only hosts that ever see the token: HTTPS subdomains of ember.ngo. */
export function isEmberApi(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === 'https:' && hostname.endsWith('.ember.ngo');
  } catch {
    // Relative or malformed URLs are not ember.ngo APIs.
    return false;
  }
}

/**
 * Adds `Authorization: Bearer <jwt>` to requests bound for *.ember.ngo, and
 * nowhere else, so the token never leaks to third-party hosts. A 401 from
 * one of those APIs means the session is gone, so it signs the user out.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isEmberApi(req.url)) {
    return next(req);
  }

  const auth = inject(Auth);
  const token = auth.accessToken();
  const authed = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authed).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && token) {
        auth.logout();
      }
      return throwError(() => error);
    }),
  );
};

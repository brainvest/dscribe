import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export type Role = 'admin' | 'user';

/** Claims carried by the access token. */
export interface TokenClaims {
  sub: string;
  name: string;
  /** The user's server-side roles: a string for one, an array for several, absent for none. */
  role?: string | string[];
  iss: string;
  iat: number;
  exp: number;
}

export interface TokenResponse {
  accessToken: string;
}

/** Thrown (as the error of the observable) when the credentials are rejected. */
export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid username or password');
  }
}

/**
 * The backend's auth endpoints. The server answers `login` and `refresh` with
 * a short-lived access token in the body and keeps the session in an
 * `HttpOnly; SameSite=Strict` cookie scoped to `/auth`, which script can
 * never read.
 */
export abstract class AuthApi {
  abstract login(username: string, password: string): Observable<TokenResponse>;
  /** Swaps the refresh cookie for a new access token; errors without a session. */
  abstract refresh(): Observable<TokenResponse>;
  /** Ends the session and clears its cookie. */
  abstract logout(): Observable<void>;
}

/** Where the dev server proxies `/auth` to SampleAuthServer (see proxy.conf.json). */
const AUTH_BASE = '/auth';

/** Talks to SampleAuthServer's `/auth` endpoints (AuthController). */
@Injectable()
export class HttpAuthApi extends AuthApi {
  private readonly http = inject(HttpClient);

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${AUTH_BASE}/login`, { username, password }).pipe(
      catchError((error: unknown) =>
        throwError(() =>
          error instanceof HttpErrorResponse && error.status === 401
            ? new InvalidCredentialsError()
            : error,
        ),
      ),
    );
  }

  refresh(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${AUTH_BASE}/refresh`, null);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${AUTH_BASE}/logout`, null);
  }
}

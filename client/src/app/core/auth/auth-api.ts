import { Injectable } from '@angular/core';
import { Observable, defer, delay, of, throwError } from 'rxjs';

export type Role = 'admin' | 'user';

/** Claims carried by the access token. */
export interface TokenClaims {
  sub: string;
  name: string;
  role: Role;
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
 * The backend's auth endpoints. The real implementation would be three HTTP
 * calls; the server answers `login` and `refresh` with a short-lived access
 * token in the body and sets the refresh token as an `HttpOnly; Secure;
 * SameSite=Strict` cookie, which script can never read.
 */
export abstract class AuthApi {
  abstract login(username: string, password: string): Observable<TokenResponse>;
  /** Swaps the refresh cookie for a new access token; errors without a session. */
  abstract refresh(): Observable<TokenResponse>;
  /** Revokes the refresh token and clears its cookie. */
  abstract logout(): Observable<void>;
}

const ACCOUNTS: Record<string, { password: string; name: string; role: Role }> = {
  user1: { password: 'pass1', name: 'User One', role: 'user' },
  admin: { password: 'somepass', name: 'A. Haghshenas', role: 'admin' },
};

/** Access tokens live for 15 minutes; the session refreshes them silently. */
const TOKEN_TTL_SECONDS = 15 * 60;

/**
 * Stand-in for the browser's cookie jar holding the HttpOnly refresh cookie,
 * so a reload keeps you signed in. Only this mock touches it; the app never
 * reads or writes auth state in storage.
 */
const MOCK_SESSION_KEY = 'ui-template.mock-refresh-cookie';

/** Accepts the two sample accounts and issues unsigned, fake JWTs. */
@Injectable()
export class MockAuthApi extends AuthApi {
  login(username: string, password: string): Observable<TokenResponse> {
    return defer(() => {
      const account = ACCOUNTS[username];
      if (!account || account.password !== password) {
        return throwError(() => new InvalidCredentialsError());
      }
      this.writeSession(username);
      return of({ accessToken: this.issue(username) });
    }).pipe(delay(400));
  }

  refresh(): Observable<TokenResponse> {
    return defer(() => {
      const username = this.readSession();
      return username && ACCOUNTS[username]
        ? of({ accessToken: this.issue(username) })
        : throwError(() => new Error('No session'));
    }).pipe(delay(150));
  }

  logout(): Observable<void> {
    return defer(() => {
      this.writeSession(null);
      return of(undefined);
    }).pipe(delay(150));
  }

  private issue(username: string): string {
    const { name, role } = ACCOUNTS[username];
    const now = Math.floor(Date.now() / 1000);
    const claims: TokenClaims = {
      sub: username,
      name,
      role,
      iss: 'https://auth.ember.ngo',
      iat: now,
      exp: now + TOKEN_TTL_SECONDS,
    };
    const header = { alg: 'HS256', typ: 'JWT' };
    return [base64Url(header), base64Url(claims), base64Url('mock-signature')].join('.');
  }

  private readSession(): string | null {
    try {
      return sessionStorage.getItem(MOCK_SESSION_KEY);
    } catch {
      return null;
    }
  }

  private writeSession(username: string | null): void {
    try {
      if (username) {
        sessionStorage.setItem(MOCK_SESSION_KEY, username);
      } else {
        sessionStorage.removeItem(MOCK_SESSION_KEY);
      }
    } catch {
      // Without storage the session just ends on reload.
    }
  }
}

function base64Url(value: unknown): string {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  return btoa(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

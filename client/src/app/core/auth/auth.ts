import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, firstValueFrom, map, of, tap } from 'rxjs';
import { AuthApi, Role, TokenClaims } from './auth-api';

/** Refresh this long before the access token expires. */
const REFRESH_LEAD_MS = 60_000;

/** Landing area for each role after sign-in. */
export const HOME_FOR_ROLE: Record<Role, string> = {
  admin: '/admin',
  user: '/app',
};

/**
 * Holds the signed-in session. The access token is kept in memory only:
 * nothing in localStorage/sessionStorage for an XSS payload to lift. A reload
 * restores the session through `AuthApi.refresh()`, which relies on the
 * HttpOnly refresh cookie, and the token is renewed shortly before it expires.
 *
 * Claims are decoded for display and routing only; the server must still
 * verify the signature and enforce roles on every request.
 */
@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly api = inject(AuthApi);
  private readonly router = inject(Router);

  private readonly token = signal<string | null>(null);
  private refreshTimer?: ReturnType<typeof setTimeout>;

  readonly claims = computed(() => decode(this.token()));
  readonly isAuthenticated = computed(() => this.claims() !== null);
  readonly role = computed(() => this.claims()?.role ?? null);
  readonly displayName = computed(() => this.claims()?.name ?? '');

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.refreshTimer));
  }

  /** Current access token, for the interceptor. */
  accessToken(): string | null {
    return this.token();
  }

  /** Run once at startup: picks up an existing session, if there is one. */
  restore(): Promise<unknown> {
    return firstValueFrom(this.refresh());
  }

  /** Emits the area to navigate to on success; errors on bad credentials. */
  login(username: string, password: string): Observable<string> {
    return this.api.login(username, password).pipe(
      tap(({ accessToken }) => this.setToken(accessToken)),
      map(() => this.homeUrl()),
    );
  }

  logout(): void {
    this.setToken(null);
    this.api.logout().subscribe();
    this.router.navigateByUrl('/');
  }

  /** Where the signed-in user belongs; `/` when nobody is. */
  homeUrl(): string {
    const role = this.role();
    return role ? HOME_FOR_ROLE[role] : '/';
  }

  private refresh(): Observable<boolean> {
    return this.api.refresh().pipe(
      tap(({ accessToken }) => this.setToken(accessToken)),
      map(() => true),
      catchError(() => {
        this.setToken(null);
        return of(false);
      }),
    );
  }

  private setToken(token: string | null): void {
    clearTimeout(this.refreshTimer);
    this.token.set(token);

    const exp = this.claims()?.exp;
    if (exp) {
      const wait = Math.max(exp * 1000 - Date.now() - REFRESH_LEAD_MS, 0);
      this.refreshTimer = setTimeout(() => {
        this.refresh().subscribe((ok) => {
          if (!ok) {
            this.router.navigateByUrl('/login');
          }
        });
      }, wait);
    }
  }
}

function decode(token: string | null): TokenClaims | null {
  if (!token) {
    return null;
  }
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(payload)) as TokenClaims;
    return claims.exp * 1000 > Date.now() ? claims : null;
  } catch {
    return null;
  }
}

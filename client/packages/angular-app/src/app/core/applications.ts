import { Injectable, computed, signal } from '@angular/core';
import { Observable, defer, delay, of, tap } from 'rxjs';

/** An application the signed-in end user may work in. */
export interface UserApplication {
  id: string;
  name: string;
  icon: string;
  /** Short line shown under the name in the switcher. */
  description?: string;
}

/** Sample list until the backend reports which applications the user can reach. */
const SAMPLE_APPLICATIONS: UserApplication[] = [
  { id: 'workspace', name: 'Workspace', icon: 'bubble_chart', description: 'Company HQ' },
  { id: 'field', name: 'Field Service', icon: 'handyman', description: 'Northern region' },
  { id: 'retail', name: 'Retail Portal', icon: 'storefront', description: 'Store operations' },
];

/**
 * The applications available to the end user and the one currently active.
 * Switching is simulated with a short delay; a real implementation would ask
 * the server to change context (and likely reissue the access token).
 */
@Injectable({ providedIn: 'root' })
export class Applications {
  readonly all = signal<UserApplication[]>(SAMPLE_APPLICATIONS);
  readonly current = signal<UserApplication>(SAMPLE_APPLICATIONS[0]);
  readonly switching = signal(false);
  /** The switcher only earns screen space when there is something to switch to. */
  readonly hasChoice = computed(() => this.all().length > 1);

  /** Emits the new application once the switch has completed. */
  switchTo(app: UserApplication): Observable<UserApplication> {
    return defer(() => {
      this.switching.set(true);
      return of(app).pipe(delay(500));
    }).pipe(
      tap({
        next: () => this.current.set(app),
        finalize: () => this.switching.set(false),
      }),
    );
  }
}

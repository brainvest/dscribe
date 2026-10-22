import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeArea = 'admin' | 'user';
/** What the user picked; `system` follows the OS preference as it changes. */
export type ThemeMode = 'light' | 'dark' | 'system';
/** What is actually painted. */
export type ResolvedThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'ui-template.theme-mode';
const MODE_CYCLE: readonly ThemeMode[] = ['light', 'dark', 'system'];
const MODE_ICONS: Record<ThemeMode, string> = {
  light: 'light_mode',
  dark: 'dark_mode',
  system: 'brightness_auto',
};
const MODE_LABELS: Record<ThemeMode, string> = {
  light: 'light theme',
  dark: 'dark theme',
  system: 'system theme',
};

/**
 * Owns the two theme axes:
 *  - `area` picks which palette block in styles.scss applies (admin vs user)
 *  - `mode` flips light/dark by setting `color-scheme` on <html>, or defers
 *    to the OS via `system`, in which case it tracks the preference live.
 * The preferred mode is remembered per area, so the admin can run dark while
 * the end-user area stays light.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  readonly area = signal<ThemeArea>('user');
  readonly mode = signal<ThemeMode>('system');
  /** The mode actually applied, with `system` resolved against the OS. */
  readonly resolvedMode = computed<ResolvedThemeMode>(() =>
    this.mode() === 'system' ? this.systemMode() : (this.mode() as ResolvedThemeMode),
  );

  /** Icon for the current mode, so a toggle button can show where it is. */
  readonly modeIcon = computed(() => MODE_ICONS[this.mode()]);
  /** Tooltip describing what the next `toggleMode()` will do. */
  readonly toggleLabel = computed(() => `Switch to ${MODE_LABELS[this.nextMode()]}`);

  private readonly systemMode = signal<ResolvedThemeMode>('light');
  private readonly nextMode = computed(
    () => MODE_CYCLE[(MODE_CYCLE.indexOf(this.mode()) + 1) % MODE_CYCLE.length],
  );

  constructor() {
    this.watchSystemPreference();

    effect(() => {
      const root = document.documentElement;
      const area = this.area();
      root.classList.toggle('area-admin', area === 'admin');
      root.classList.toggle('area-user', area === 'user');
      root.style.colorScheme = this.resolvedMode();
    });
  }

  /** Called by each shell when it activates, restoring that area's saved mode. */
  useArea(area: ThemeArea): void {
    this.area.set(area);
    this.mode.set(this.read(area));
  }

  /** Cycles light → dark → system. */
  toggleMode(): void {
    this.setMode(this.nextMode());
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    this.write(this.area(), mode);
  }

  // Storage and matchMedia are both optional: they are missing under SSR and
  // can throw in browsers with site data blocked, so neither may break the app.
  private watchSystemPreference(): void {
    let query: MediaQueryList | undefined;
    try {
      query = globalThis.matchMedia?.('(prefers-color-scheme: dark)');
    } catch {
      return;
    }
    if (!query) {
      return;
    }

    const apply = () => this.systemMode.set(query.matches ? 'dark' : 'light');
    apply();
    query.addEventListener('change', apply);
    inject(DestroyRef).onDestroy(() => query.removeEventListener('change', apply));
  }

  private read(area: ThemeArea): ThemeMode {
    try {
      const stored = localStorage?.getItem(`${STORAGE_KEY}.${area}`);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // Ignore and fall back to the system preference.
    }
    return 'system';
  }

  private write(area: ThemeArea, mode: ThemeMode): void {
    try {
      localStorage?.setItem(`${STORAGE_KEY}.${area}`, mode);
    } catch {
      // A preference we cannot persist is not worth failing a click over.
    }
  }
}

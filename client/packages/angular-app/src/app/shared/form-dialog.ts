import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';

/** Below this the dialog takes the whole screen, like the routed page does. */
const SMALL_SCREEN = [Breakpoints.XSmall, Breakpoints.Small];

/**
 * Opens a routed form component as a dialog over the current page. On large
 * displays it floats over a blurred backdrop; on small ones it goes full
 * screen, and it follows the breakpoint if the window is resized while open.
 *
 * Emits `true` when the form closed after a successful save.
 */
@Injectable({ providedIn: 'root' })
export class FormDialog {
  private readonly dialog = inject(MatDialog);
  private readonly breakpoints = inject(BreakpointObserver);

  open<T>(component: ComponentType<T>, width: string): Observable<boolean> {
    const ref = this.dialog.open<T, unknown, boolean>(component, {
      width,
      maxWidth: '100vw',
      maxHeight: '100dvh',
      backdropClass: 'app-blur-backdrop',
      autoFocus: 'first-tabbable',
    });

    const sub = this.breakpoints.observe(SMALL_SCREEN).subscribe(({ matches }) => {
      if (matches) {
        ref.updateSize('100vw', '100dvh');
        ref.addPanelClass('app-dialog-fullscreen');
      } else {
        ref.updateSize(width, '');
        ref.removePanelClass('app-dialog-fullscreen');
      }
    });

    ref.afterClosed().subscribe(() => sub.unsubscribe());

    return ref.afterClosed().pipe(map((saved) => saved === true));
  }
}

import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '../../core/auth/auth';
import { ADMIN_RIBBON, RibbonCommand } from '../../core/navigation';
import { Theme } from '../../core/theme';
import { Ribbon } from '../ribbon/ribbon';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, MatIconModule, MatMenuModule, MatTooltipModule, Ribbon],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  private readonly snackBar = inject(MatSnackBar);
  protected readonly theme = inject(Theme);
  protected readonly auth = inject(Auth);
  protected readonly tabs = ADMIN_RIBBON;
  protected readonly ribbonCollapsed = signal(false);

  constructor() {
    this.theme.useArea('admin');
  }

  /** Placeholder commands report here instead of navigating. */
  onCommand(cmd: RibbonCommand): void {
    this.snackBar.open(`“${cmd.label}” is a sample command`, 'Dismiss', { duration: 2500 });
  }
}

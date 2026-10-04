import { Component, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../core/auth/auth';
import { DrawerItem, USER_DRAWER } from '../../core/navigation';
import { Theme } from '../../core/theme';

@Component({
  selector: 'app-user-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  templateUrl: './user-shell.html',
  styleUrl: './user-shell.scss',
})
export class UserShell {
  private readonly snackBar = inject(MatSnackBar);
  protected readonly theme = inject(Theme);
  protected readonly auth = inject(Auth);
  protected readonly sections = USER_DRAWER;
  protected readonly opened = signal(true);

  constructor() {
    this.theme.useArea('user');
  }

  onPlaceholder(item: DrawerItem): void {
    this.snackBar.open(`“${item.label}” is a sample menu item`, 'OK', { duration: 2500 });
  }
}

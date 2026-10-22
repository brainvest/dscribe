import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

/** Landing spot for the sample menu items that have no implementation. */
@Component({
  selector: 'app-admin-placeholder-page',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './placeholder-page.html',
  styleUrl: './placeholder-page.scss',
})
export class PlaceholderPage {
  protected readonly path = inject(Router).url;
}

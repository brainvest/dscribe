import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CardItem, FlipCard } from '../../../shared/flip-card/flip-card';
import { FormDialog } from '../../../shared/form-dialog';
import { COLLECTION_ITEMS } from '../../data/collection';
import { CollectionForm } from '../collection-form/collection-form';

export type CatalogView = 'cards' | 'grid';

const VIEW_STORAGE_KEY = 'ui-template.collection-view';

@Component({
  selector: 'app-catalog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    RouterLink,
    FlipCard,
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private readonly formDialog = inject(FormDialog);
  private readonly router = inject(Router);

  protected readonly items = COLLECTION_ITEMS;
  /** Only one card is open at a time, so the layout never jumps twice. */
  protected readonly openId = signal<number | null>(null);

  /** Cards or a tabular grid; remembered across visits. */
  protected readonly view = signal<CatalogView>(readView());

  protected readonly columns = ['title', 'tag', 'blurb', 'facts', 'actions'];
  protected readonly dataSource = new MatTableDataSource<CardItem>(this.items);
  private readonly sort = viewChild(MatSort);

  constructor() {
    // The table only exists in grid view, so hook the sort up whenever it appears.
    effect(() => {
      this.dataSource.sort = this.sort() ?? null;
    });
  }

  protected setView(view: CatalogView): void {
    this.view.set(view);
    writeView(view);
  }

  protected setFlipped(item: CardItem, flipped: boolean): void {
    this.openId.set(flipped ? item.id : null);
  }

  protected openItem(item: CardItem): void {
    this.router.navigate(['/app/collection', item.id]);
  }

  /** Same form as `/app/collection/new`, opened over the collection. */
  protected quickAdd(): void {
    this.formDialog.open(CollectionForm, '720px').subscribe((saved) => {
      if (saved) {
        this.refresh();
      }
    });
  }

  /** Reload the collection after a change. Placeholder: the data is static. */
  private refresh(): void {}
}

// Storage can throw with site data blocked; a lost preference must not break the page.
function readView(): CatalogView {
  try {
    const stored = localStorage?.getItem(VIEW_STORAGE_KEY);
    if (stored === 'cards' || stored === 'grid') {
      return stored;
    }
  } catch {
    // Fall back to the default.
  }
  return 'cards';
}

function writeView(view: CatalogView): void {
  try {
    localStorage?.setItem(VIEW_STORAGE_KEY, view);
  } catch {
    // Not worth failing a click over.
  }
}

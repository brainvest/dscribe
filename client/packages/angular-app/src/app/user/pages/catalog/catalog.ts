import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CardItem, FlipCard } from '../../../shared/flip-card/flip-card';
import { FormDialog } from '../../../shared/form-dialog';
import { COLLECTION_ITEMS } from '../../data/collection';
import { CollectionForm } from '../collection-form/collection-form';

@Component({
  selector: 'app-catalog',
  imports: [MatIconModule, MatButtonModule, RouterLink, FlipCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private readonly formDialog = inject(FormDialog);

  protected readonly items = COLLECTION_ITEMS;
  /** Only one card is open at a time, so the layout never jumps twice. */
  protected readonly openId = signal<number | null>(null);

  protected setFlipped(item: CardItem, flipped: boolean): void {
    this.openId.set(flipped ? item.id : null);
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

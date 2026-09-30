import { Component, HostBinding, HostListener, input, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

export interface CardFact {
  label: string;
  value: string;
}

export interface CardItem {
  id: number;
  icon: string;
  title: string;
  blurb: string;
  tag: string;
  details: string;
  facts: CardFact[];
}

/**
 * A card that rotates on click to reveal a larger back face with more detail.
 * The host grows to span two grid tracks while flipped, so the back has room.
 */
@Component({
  selector: 'app-flip-card',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './flip-card.html',
  styleUrl: './flip-card.scss',
})
export class FlipCard {
  readonly item = input.required<CardItem>();
  readonly flipped = model(false);
  /** When set, the back face offers an Edit button that navigates here. */
  readonly editLink = input<string | unknown[]>();

  @HostBinding('class.is-flipped') get flippedClass(): boolean {
    return this.flipped();
  }

  @HostListener('click') onClick(): void {
    this.flipped.set(!this.flipped());
  }

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.flipped.set(!this.flipped());
    }
  }

  @HostBinding('attr.tabindex') readonly tabindex = 0;
  @HostBinding('attr.role') readonly role = 'button';
}

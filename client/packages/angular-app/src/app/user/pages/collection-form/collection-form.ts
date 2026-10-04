import { Component, computed, effect, inject, input, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COLLECTION_ICONS, COLLECTION_ITEMS, COLLECTION_TAGS } from '../../data/collection';

/**
 * End-user add/edit sample at `/app/collection/new` and `/app/collection/:id`.
 * Same three field states as the admin form (hint, check, error) but with the
 * roomier user-area styling; saving only shows a snackbar and returns to the
 * collection, since the list is static sample data.
 *
 * Also opens as a dialog over the collection (FormDialog); then it closes
 * with `true` on save instead of navigating.
 */
@Component({
  selector: 'app-collection-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './collection-form.html',
  styleUrl: './collection-form.scss',
  host: { '[class.in-dialog]': 'inDialog' },
})
export class CollectionForm {
  readonly id = input<string>();

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialogRef = inject(MatDialogRef<CollectionForm, boolean>, { optional: true });

  protected readonly inDialog = this.dialogRef !== null;

  protected readonly tags = COLLECTION_TAGS;
  protected readonly icons = COLLECTION_ICONS;

  protected readonly itemId = computed(() => (this.id() ? Number(this.id()) : null));
  protected readonly isEdit = computed(() => this.itemId() !== null);
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group(
    {
      title: ['', [Validators.required, Validators.maxLength(40)]],
      blurb: ['', [Validators.required, Validators.maxLength(80)]],
      tag: ['', Validators.required],
      icon: [COLLECTION_ICONS[0] as string, Validators.required],
      details: ['', [Validators.required, Validators.minLength(40)]],
      shared: [false],
    },
    { validators: [(group) => this.objectRules(group)] },
  );

  constructor() {
    effect(() => {
      const id = this.itemId();
      if (id === null) {
        return;
      }
      const item = COLLECTION_ITEMS.find((i) => i.id === id);
      if (item) {
        this.form.patchValue(item);
      } else {
        this.router.navigate(['/app/collection']);
      }
    });
  }

  protected get objectErrors(): string[] {
    const errors = this.form.errors ?? {};
    const messages: string[] = [];
    if (errors['titleTaken']) {
      messages.push('You already have a card with this title. Pick something more specific.');
    }
    if (errors['blurbRepeatsTitle']) {
      messages.push('The short description just repeats the title. Say what the card is for.');
    }
    if (errors['sharedNeedsDetails']) {
      messages.push(
        'Shared cards need at least 80 characters of details so others get the context.',
      );
    }
    return messages;
  }

  protected get invalidFieldCount(): number {
    return Object.values(this.form.controls).filter((c) => c.invalid).length;
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitted.set(true);
      return;
    }
    // Sample only: nothing is persisted.
    const { title } = this.form.getRawValue();
    this.snackBar.open(
      this.isEdit() ? `Saved “${title}”` : `Added “${title}” to your collection`,
      'OK',
      { duration: 2000 },
    );
    this.close(true);
  }

  protected close(saved = false): void {
    if (this.dialogRef) {
      this.dialogRef.close(saved);
    } else {
      this.router.navigate(['/app/collection']);
    }
  }

  private objectRules(group: AbstractControl): ValidationErrors | null {
    const { title, blurb, details, shared } = group.value as {
      title: string;
      blurb: string;
      details: string;
      shared: boolean;
    };
    const errors: ValidationErrors = {};
    const t = title?.trim().toLowerCase();

    if (t && COLLECTION_ITEMS.some((i) => i.id !== this.itemId() && i.title.toLowerCase() === t)) {
      errors['titleTaken'] = true;
    }
    if (t && blurb?.trim().toLowerCase() === t) {
      errors['blurbRepeatsTitle'] = true;
    }
    if (shared && (details?.trim().length ?? 0) < 80) {
      errors['sharedNeedsDetails'] = true;
    }
    return Object.keys(errors).length ? errors : null;
  }
}

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
import { MatSnackBar } from '@angular/material/snack-bar';
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES, ProductStatus } from '../../data/product.model';
import { ProductStore } from '../../data/product';

/**
 * Serves both `/admin/products/new` and `/admin/products/:id`; the `id` route
 * param arrives as a component input (withComponentInputBinding).
 *
 * Field states: an untouched field shows its hint; a valid, edited field gets
 * a check in the suffix; an invalid, touched field shows a `mat-error`.
 * Cross-field rules live on the group and render in the banner above the
 * fields, together with a summary once a submit is attempted.
 *
 * The same component also opens as a dialog over the list (FormDialog); then
 * it closes with `true` on save instead of navigating.
 */
@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  host: { '[class.in-dialog]': 'inDialog' },
})
export class ProductForm {
  readonly id = input<string>();

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(ProductStore);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialogRef = inject(MatDialogRef<ProductForm, boolean>, { optional: true });

  protected readonly inDialog = this.dialogRef !== null;

  protected readonly categories = PRODUCT_CATEGORIES;
  protected readonly statuses = PRODUCT_STATUSES;

  protected readonly productId = computed(() => (this.id() ? Number(this.id()) : null));
  protected readonly isEdit = computed(() => this.productId() !== null);

  /** Set on a failed submit so the banner can summarise the field errors. */
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      sku: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]+$/)]],
      category: [PRODUCT_CATEGORIES[0] as string, Validators.required],
      status: ['draft' as ProductStatus, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    },
    { validators: [(group) => this.objectRules(group)] },
  );

  constructor() {
    effect(() => {
      const id = this.productId();
      if (id === null) {
        return;
      }
      const product = this.store.byId(id);
      if (product) {
        this.form.patchValue(product);
      } else {
        this.router.navigate(['/admin/products']);
      }
    });
  }

  /** Messages for the object-level banner, in display order. */
  protected get objectErrors(): string[] {
    const errors = this.form.errors ?? {};
    const messages: string[] = [];
    if (errors['skuTaken']) {
      messages.push(`SKU ${errors['skuTaken']} is already used by another product.`);
    }
    if (errors['discontinuedWithStock']) {
      messages.push(
        'A discontinued product cannot hold stock. Set stock to 0 or change the status.',
      );
    }
    if (errors['activeWithoutPrice']) {
      messages.push('An active product needs a price above 0.');
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
    const draft = this.form.getRawValue();
    const id = this.productId();
    if (id === null) {
      this.store.create(draft);
      this.snackBar.open(`Created “${draft.name}”`, 'OK', { duration: 2000 });
    } else {
      this.store.update(id, draft);
      this.snackBar.open(`Saved “${draft.name}”`, 'OK', { duration: 2000 });
    }
    this.close(true);
  }

  protected close(saved = false): void {
    if (this.dialogRef) {
      this.dialogRef.close(saved);
    } else {
      this.router.navigate(['/admin/products']);
    }
  }

  /** Rules that involve more than one field, or the rest of the collection. */
  private objectRules(group: AbstractControl): ValidationErrors | null {
    const { sku, status, stock, price } = group.value as {
      sku: string;
      status: ProductStatus;
      stock: number;
      price: number;
    };
    const errors: ValidationErrors = {};

    const clash = this.store
      .products()
      .find((p) => p.id !== this.productId() && p.sku.toLowerCase() === sku?.toLowerCase());
    if (clash) {
      errors['skuTaken'] = clash.sku;
    }
    if (status === 'discontinued' && stock > 0) {
      errors['discontinuedWithStock'] = true;
    }
    if (status === 'active' && !(price > 0)) {
      errors['activeWithoutPrice'] = true;
    }
    return Object.keys(errors).length ? errors : null;
  }
}

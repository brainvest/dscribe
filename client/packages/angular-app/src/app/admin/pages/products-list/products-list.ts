import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES, Product } from '../../data/product.model';
import { ProductStore } from '../../data/product';
import { ConfirmDialog, ConfirmData } from '../../../shared/confirm-dialog/confirm-dialog';
import { FormDialog } from '../../../shared/form-dialog';
import { ProductForm } from '../product-form/product-form';

interface Filters {
  text: string;
  categories: string[];
  statuses: string[];
  inStockOnly: boolean;
}

@Component({
  selector: 'app-products-list',
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  private readonly store = inject(ProductStore);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly formDialog = inject(FormDialog);

  protected readonly categories = PRODUCT_CATEGORIES;
  protected readonly statuses = PRODUCT_STATUSES;

  protected readonly columns = [
    'select',
    'name',
    'sku',
    'category',
    'status',
    'price',
    'stock',
    'activity',
    'updatedAt',
    'actions',
  ];

  protected readonly dataSource = new MatTableDataSource<Product>([]);
  protected readonly filtersOpen = signal(true);

  /**
   * Selection is a signal rather than a CDK SelectionModel: the app runs
   * zoneless, so the template only re-renders when a reactive value changes.
   */
  protected readonly selectedIds = signal<ReadonlySet<number>>(new Set());
  protected readonly selectedCount = computed(() => this.selectedIds().size);
  protected readonly hasSelection = computed(() => this.selectedCount() > 0);

  // Filter controls. Their combined value feeds MatTableDataSource.filter,
  // which the custom predicate below interprets.
  protected readonly text = new FormControl('', { nonNullable: true });
  protected readonly categoryFilter = new FormControl<string[]>([], { nonNullable: true });
  protected readonly statusFilter = new FormControl<string[]>([], { nonNullable: true });
  protected readonly inStockOnly = new FormControl(false, { nonNullable: true });

  private readonly textValue = toSignal(this.text.valueChanges, { initialValue: '' });
  private readonly categoryValue = toSignal(this.categoryFilter.valueChanges, { initialValue: [] });
  private readonly statusValue = toSignal(this.statusFilter.valueChanges, { initialValue: [] });
  private readonly stockValue = toSignal(this.inStockOnly.valueChanges, { initialValue: false });

  private readonly sort = viewChild.required(MatSort);
  private readonly paginator = viewChild.required(MatPaginator);

  constructor() {
    this.dataSource.filterPredicate = (row, raw) => this.matches(row, JSON.parse(raw) as Filters);
    this.dataSource.sortingDataAccessor = (row, column) => {
      const value = row[column as keyof Product];
      return typeof value === 'number' ? value : String(value ?? '').toLowerCase();
    };

    effect(() => {
      const products = this.store.products();
      this.dataSource.data = products;
      // Drop selections for rows that no longer exist.
      const live = new Set(products.map((p) => p.id));
      this.selectedIds.update((ids) => new Set([...ids].filter((id) => live.has(id))));
    });

    effect(() => {
      this.dataSource.sort = this.sort();
      this.dataSource.paginator = this.paginator();
    });

    effect(() => {
      const filters: Filters = {
        text: this.textValue().trim().toLowerCase(),
        categories: this.categoryValue(),
        statuses: this.statusValue(),
        inStockOnly: this.stockValue(),
      };
      this.dataSource.filter = JSON.stringify(filters);
      this.dataSource.paginator?.firstPage();
    });
  }

  protected get activeFilterCount(): number {
    return (
      (this.text.value.trim() ? 1 : 0) +
      (this.categoryFilter.value.length ? 1 : 0) +
      (this.statusFilter.value.length ? 1 : 0) +
      (this.inStockOnly.value ? 1 : 0)
    );
  }

  protected clearFilters(): void {
    this.text.setValue('');
    this.categoryFilter.setValue([]);
    this.statusFilter.setValue([]);
    this.inStockOnly.setValue(false);
  }

  // ------------------------------------------------------------- selection
  protected get visibleIds(): number[] {
    return this.dataSource.filteredData.map((p) => p.id);
  }

  protected isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  protected toggle(id: number): void {
    this.selectedIds.update((ids) => {
      const next = new Set(ids);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  protected clearSelection(): void {
    this.selectedIds.set(new Set());
  }

  protected allVisibleSelected(): boolean {
    const ids = this.visibleIds;
    return ids.length > 0 && ids.every((id) => this.isSelected(id));
  }

  protected someVisibleSelected(): boolean {
    return this.visibleIds.some((id) => this.isSelected(id)) && !this.allVisibleSelected();
  }

  protected toggleAll(): void {
    const visible = this.visibleIds;
    const deselect = this.allVisibleSelected();
    this.selectedIds.update((ids) => {
      const next = new Set(ids);
      for (const id of visible) {
        deselect ? next.delete(id) : next.add(id);
      }
      return next;
    });
  }

  private deselect(ids: number[]): void {
    const gone = new Set(ids);
    this.selectedIds.update((current) => new Set([...current].filter((id) => !gone.has(id))));
  }

  // ---------------------------------------------------------------- actions
  /** Same form as `/admin/products/new`, opened over the list. */
  protected quickAdd(): void {
    this.formDialog.open(ProductForm, '820px').subscribe((saved) => {
      if (saved) {
        this.refresh();
      }
    });
  }

  /** Reload the grid after a change. Placeholder: the store is already live. */
  private refresh(): void {}

  protected showHistory(): void {
    // Intentionally inert: the toolbar button is a visual placeholder.
    this.snackBar.open(
      `History for ${this.selectedCount()} selected item(s) — not implemented`,
      'OK',
      { duration: 2500 },
    );
  }

  protected deleteSelected(): void {
    this.confirmDelete([...this.selectedIds()]);
  }

  protected deleteOne(product: Product): void {
    this.confirmDelete([product.id], product.name);
  }

  private confirmDelete(ids: number[], name?: string): void {
    if (!ids.length) {
      return;
    }
    const data: ConfirmData = {
      title: ids.length === 1 ? 'Delete product' : `Delete ${ids.length} products`,
      message: name
        ? `“${name}” will be permanently removed.`
        : `${ids.length} products will be permanently removed.`,
      confirmLabel: 'Delete',
      destructive: true,
    };
    this.dialog
      .open(ConfirmDialog, { data, width: '380px' })
      .afterClosed()
      .subscribe((ok) => {
        if (!ok) {
          return;
        }
        this.store.remove(ids);
        this.deselect(ids);
        this.snackBar.open(`Deleted ${ids.length} product(s)`, 'OK', { duration: 2000 });
      });
  }

  private matches(row: Product, f: Filters): boolean {
    if (f.text && !`${row.name} ${row.sku} ${row.category}`.toLowerCase().includes(f.text)) {
      return false;
    }
    if (f.categories.length && !f.categories.includes(row.category)) {
      return false;
    }
    if (f.statuses.length && !f.statuses.includes(row.status)) {
      return false;
    }
    if (f.inStockOnly && row.stock <= 0) {
      return false;
    }
    return true;
  }
}

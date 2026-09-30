import { Injectable, signal } from '@angular/core';
import { PRODUCT_CATEGORIES, Product, ProductDraft, ProductStatus } from './product.model';

const NAMES = [
  'Aurora Docking Station',
  'Basalt Rack Mount',
  'Cobalt Sync Agent',
  'Delta Field Sensor',
  'Ember Print Server',
  'Fathom Storage Array',
  'Granite Access Point',
  'Halcyon Support Plan',
  'Iris Label Printer',
  'Juniper Cable Kit',
  'Kestrel Firmware Suite',
  'Lumen Panel Controller',
  'Meridian Gateway',
  'Nimbus Backup Node',
  'Onyx Barcode Scanner',
  'Pinnacle Analytics Seat',
  'Quartz Power Supply',
  'Ridge Thermal Probe',
  'Summit Deployment Kit',
  'Tundra Cooling Fan',
  'Umbra Signage Player',
  'Vertex Router',
  'Willow Tablet Mount',
  'Zephyr Air Filter',
  'Anchor Toolbelt',
  'Beacon Alert Module',
  'Citadel Security Bundle',
  'Drift Log Collector',
];

/**
 * In-memory CRUD store. Swap the body of these methods for HTTP calls; the
 * component API (signals of the full collection) stays the same.
 */
@Injectable({ providedIn: 'root' })
export class ProductStore {
  private nextId = 1;
  readonly products = signal<Product[]>(this.seed());

  byId(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  create(draft: ProductDraft): Product {
    const product: Product = {
      ...draft,
      id: this.nextId++,
      updatedAt: new Date().toISOString(),
      attachments: 0,
      comments: 0,
    };
    this.products.update((list) => [product, ...list]);
    return product;
  }

  update(id: number, draft: ProductDraft): void {
    this.products.update((list) =>
      list.map((p) => (p.id === id ? { ...p, ...draft, updatedAt: new Date().toISOString() } : p)),
    );
  }

  remove(ids: number[]): void {
    const doomed = new Set(ids);
    this.products.update((list) => list.filter((p) => !doomed.has(p.id)));
  }

  private seed(): Product[] {
    const statuses: ProductStatus[] = ['draft', 'active', 'active', 'active', 'discontinued'];
    return NAMES.map((name, i) => {
      const day = String(((i * 7) % 27) + 1).padStart(2, '0');
      const month = String(((i * 3) % 12) + 1).padStart(2, '0');
      return {
        id: this.nextId++,
        name,
        sku: `SKU-${String(1000 + i * 13)}`,
        category: PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length],
        status: statuses[i % statuses.length],
        price: Math.round((40 + ((i * 137) % 900) + (i % 4) * 0.5) * 100) / 100,
        stock: (i * 17) % 240,
        updatedAt: `2026-${month}-${day}T09:${String((i * 5) % 60).padStart(2, '0')}:00Z`,
        attachments: (i * 3) % 5,
        comments: (i * 5) % 7,
      };
    });
  }
}

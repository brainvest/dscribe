export type ProductStatus = 'draft' | 'active' | 'discontinued';

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  status: ProductStatus;
  price: number;
  stock: number;
  updatedAt: string;
  /** Badge counts rendered as icons in the grid. */
  attachments: number;
  comments: number;
}

export type ProductDraft = Omit<Product, 'id' | 'updatedAt' | 'attachments' | 'comments'>;

export const PRODUCT_CATEGORIES = [
  'Hardware',
  'Software',
  'Services',
  'Consumables',
  'Licensing',
] as const;

export const PRODUCT_STATUSES: ProductStatus[] = ['draft', 'active', 'discontinued'];

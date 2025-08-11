export interface Category {
  id: string;
  name: string;
  icon: string; // Icon name or path
  description?: string;
  createdAt: string;
  updatedAt: string;
  productsCount?: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  weight: number;
  weightUnit: "kg" | "g" | "mg" | "ml" | "l";
  categoryId: string;
  attachments: ProductAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: "image" | "video";
  fileSize: number;
}

export interface GetCategoriesResponse {
  count: number;
  rows: Category[];
}

export interface GetProductsResponse {
  count: number;
  rows: Product[];
}

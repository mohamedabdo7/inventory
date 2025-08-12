// types/index.ts
export interface Category {
  id: number;
  name: string;
  icon: string;
  productCount: number;
}

export interface Product {
  id: number;
  categoryId?: number;
  name: string;
  description: string;
  size: string;
  brand: string;
  color: string;
  attachments: string[];
  weight?: number;
}

export interface CategoryFormData {
  name: string;
  icon: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  size: string;
  brand: string;
  color: string;
  attachments: string[];
  weight?: number;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  categories: Category[];
  products: { [categoryId: number]: Product[] };
  avatarUrl?: string;
}

export interface RegistrationFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
}

// export interface Category {
//   id: number;
//   name: string;
//   icon: string;
//   productCount: number;
// }

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   size: string;
//   brand: string;
//   color: string;
//   attachments: string[];
//   categoryId: number;
//   weight?: number;
// }

// export interface ProductFormData {
//   name: string;
//   description: string;
//   size: string;
//   brand: string;
//   color: string;
//   attachments: string[];
//   weight?: number;
// }

// export interface CategoryFormData {
//   name: string;
//   icon: string;
// }

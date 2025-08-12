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
  // Travel essentials preferences
  travelPreferences?: {
    defaultSeason?: import("./travelEssentials").Season;
    defaultTripType?: import("./travelEssentials").TripType;
    customEssentials?: string[]; // IDs of user's custom essentials
    enableEssentialsNotifications?: boolean;
  };
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

// Integration with Pack system
export interface ProductForPack {
  id: string;
  name: string;
  categoryId?: number;
  thumbnail?: string;
  weight?: number;
}

// Convert Product to PackItem compatible format
export const productToPackItem = (product: Product): ProductForPack => ({
  id: `product_${product.id}`,
  name: product.name,
  categoryId: product.categoryId,
  thumbnail: product.attachments?.[0],
  weight: product.weight,
});

// Helper function to get all products as pack-compatible items
export const getAllProductsForPack = (products: {
  [categoryId: number]: Product[];
}): ProductForPack[] => {
  const allProducts: ProductForPack[] = [];

  Object.values(products).forEach((categoryProducts) => {
    categoryProducts.forEach((product) => {
      allProducts.push(productToPackItem(product));
    });
  });

  return allProducts;
};

// // types/index.ts
// export interface Category {
//   id: number;
//   name: string;
//   icon: string;
//   productCount: number;
// }

// export interface Product {
//   id: number;
//   categoryId?: number;
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

// export interface ProductFormData {
//   name: string;
//   description: string;
//   size: string;
//   brand: string;
//   color: string;
//   attachments: string[];
//   weight?: number;
// }

// export interface UserData {
//   name: string;
//   email: string;
//   phone: string;
//   categories: Category[];
//   products: { [categoryId: number]: Product[] };
//   avatarUrl?: string;
// }

// export interface RegistrationFormData {
//   name: string;
//   phone: string;
//   email: string;
//   password: string;
// }

// export interface FormErrors {
//   name?: string;
//   phone?: string;
//   email?: string;
//   password?: string;
// }

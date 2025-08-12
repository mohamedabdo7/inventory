import { useState } from "react";
import { Category, Product, CategoryFormData, ProductFormData } from "../types";
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from "../data";

export const useClosetData = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Record<number, Product[]>>(INITIAL_PRODUCTS);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);

  const addCategory = (categoryData: CategoryFormData) => {
    const newCategory: Category = {
      id: Date.now(),
      name: categoryData.name,
      icon: categoryData.icon,
      productCount: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
    setProducts((prev) => ({ ...prev, [newCategory.id]: [] }));
    return newCategory;
  };

  const updateCategory = (categoryId: number, categoryData: CategoryFormData) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, name: categoryData.name, icon: categoryData.icon } : cat
      )
    );
  };

  const deleteCategory = (categoryId: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    setProducts((prev) => {
      const newProducts = { ...prev };
      delete newProducts[categoryId];
      return newProducts;
    });

    if (selectedCategoryId === categoryId) {
      const remainingCategory = categories.find((cat) => cat.id !== categoryId);
      setSelectedCategoryId(remainingCategory?.id || 1);
    }
  };

  const addProduct = (productData: ProductFormData, categoryId: number) => {
    const newProduct: Product = {
      id: Date.now(),
      ...productData,
      categoryId,
    };

    setProducts((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), newProduct],
    }));

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, productCount: cat.productCount + 1 } : cat
      )
    );

    return newProduct;
  };

  const updateProduct = (productId: number, productData: ProductFormData, categoryId: number) => {
    setProducts((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].map((product) =>
        product.id === productId ? { ...product, ...productData } : product
      ),
    }));
  };

  const deleteProduct = (productId: number, categoryId: number) => {
    setProducts((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].filter((p) => p.id !== productId),
    }));

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, productCount: Math.max(0, cat.productCount - 1) } : cat
      )
    );
  };

  return {
    categories,
    products,
    selectedCategoryId,
    setSelectedCategoryId,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

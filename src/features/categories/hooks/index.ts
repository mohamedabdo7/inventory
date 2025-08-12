// hooks/index.ts
import { useState, useEffect, useMemo } from "react";
import { Category, Product, CategoryFormData, ProductFormData, UserData } from "../types";

export const useClosetData = (userData?: UserData | null) => {
  const [categories, setCategories] = useState<Category[]>(userData?.categories || []);
  const [products, setProducts] = useState<{ [key: number]: Product[] }>(userData?.products || {});
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (userData) {
      setCategories(userData.categories);
      setProducts(userData.products);
    }
  }, [userData]);

  // Update product count when products change
  const categoriesWithCount = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      productCount: products[cat.id]?.length || 0,
    }));
  }, [categories, products]);

  return {
    categories: categoriesWithCount,
    products,
    selectedCategoryId,
    setSelectedCategoryId,
    addCategory: (category: CategoryFormData) => {
      const newCategory: Category = {
        id: Date.now(),
        name: category.name,
        icon: category.icon,
        productCount: 0,
      };
      setCategories((prev) => [...prev, newCategory]);
      setProducts((prev) => ({ ...prev, [newCategory.id]: [] }));
    },
    updateCategory: (id: number, category: CategoryFormData) => {
      setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, ...category } : cat)));
    },
    deleteCategory: (id: number) => {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setProducts((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    },
    addProduct: (product: ProductFormData, categoryId: number | null) => {
      if (!categoryId) return;
      const newProduct: Product = { id: Date.now(), ...product };
      setProducts((prev) => ({
        ...prev,
        [categoryId]: [...(prev[categoryId] || []), newProduct],
      }));
    },
    updateProduct: (id: number, product: ProductFormData, categoryId: number | null) => {
      if (!categoryId) return;
      setProducts((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId]?.map((p) => (p.id === id ? { ...p, ...product } : p)) || [],
      }));
    },
    deleteProduct: (id: number, categoryId: number | null) => {
      if (!categoryId) return;
      setProducts((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId]?.filter((p) => p.id !== id) || [],
      }));
    },
  };
};

export const useSearch = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.color.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  return { searchTerm, setSearchTerm, filteredProducts };
};

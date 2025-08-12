// components/ProductsSection.tsx
import React from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Category, Product, ProductFormData } from "../types";
import { SearchBar } from "../../../components/common/SearchBar";
import { EmptyState } from "../../../components/common/EmptyState";
import { ProductCard } from "../components/ProductCard";
import { AddProductForm } from "./AddProductForm";

interface ProductsSectionProps {
  selectedCategory: Category;
  filteredProducts: Product[];
  searchTerm: string;
  isAddingProduct: boolean;
  editingProduct: number | null;
  productForm: ProductFormData;
  onSearchChange: (term: string) => void;
  onStartAddingProduct: () => void;
  onEditProduct: (product: Product) => void;
  onSaveProduct: () => void;
  onCancelEditProduct: () => void;
  onDeleteProduct: (id: number) => void;
  onProductFormChange: (form: ProductFormData) => void;
  onAddProduct: () => void;
  onCancelAddProduct: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  selectedCategory,
  filteredProducts,
  searchTerm,
  isAddingProduct,
  editingProduct,
  productForm,
  onSearchChange,
  onStartAddingProduct,
  onEditProduct,
  onSaveProduct,
  onCancelEditProduct,
  onDeleteProduct,
  onProductFormChange,
  onAddProduct,
  onCancelAddProduct,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center text-xl font-semibold text-gray-800">
          <span className="mr-2 text-2xl">{selectedCategory.icon}</span>
          {selectedCategory.name}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartAddingProduct}
          className="flex items-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <Plus size={20} className="mr-2" />
          Add Item
        </motion.button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

      {/* Add Product Form */}
      <AddProductForm
        isVisible={isAddingProduct}
        form={productForm}
        onFormChange={onProductFormChange}
        onAdd={onAddProduct}
        onCancel={onCancelAddProduct}
      />

      {/* Products Grid */}
      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                isEditing={editingProduct === product.id}
                editForm={productForm}
                onEdit={onEditProduct}
                onSave={onSaveProduct}
                onCancel={onCancelEditProduct}
                onDelete={onDeleteProduct}
                onFormChange={onProductFormChange}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && <EmptyState searchTerm={searchTerm} />}
    </div>
  );
};

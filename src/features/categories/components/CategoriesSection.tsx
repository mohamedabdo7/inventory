// components/CategoriesSection.tsx
import React from "react";
import { Plus, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Category, CategoryFormData } from "../types";
import { CategoryCard } from "../components/CategoryCard";
import { AddCategoryCard } from "../components/AddCategoryCard";

interface CategoriesSectionProps {
  categories: Category[];
  selectedCategoryId: number | null;
  isAddingCategory: boolean;
  editingCategory: number | null;
  categoryForm: CategoryFormData;
  onSetSelectedCategory: (id: number | null) => void;
  onStartAddingCategory: () => void;
  onEditCategory: (category: Category) => void;
  onSaveCategory: () => void;
  onCancelEditCategory: () => void;
  onDeleteCategory: (id: number) => void;
  onCategoryFormChange: (form: CategoryFormData) => void;
  onAddCategory: () => void;
  onCancelAddCategory: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  selectedCategoryId,
  isAddingCategory,
  editingCategory,
  categoryForm,
  onSetSelectedCategory,
  onStartAddingCategory,
  onEditCategory,
  onSaveCategory,
  onCancelEditCategory,
  onDeleteCategory,
  onCategoryFormChange,
  onAddCategory,
  onCancelAddCategory,
}) => {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center text-xl font-semibold text-gray-800">
          <Package className="mr-2" size={24} />
          Wardrobe Categories
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartAddingCategory}
          className="flex items-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </motion.button>
      </div>

      {/* Horizontal Scrollable Categories */}
      <div className="relative">
        <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 flex gap-4 overflow-x-auto pb-4">
          <AnimatePresence>
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard
                  category={category}
                  isSelected={selectedCategoryId === category.id}
                  isEditing={editingCategory === category.id}
                  editForm={categoryForm}
                  onSelect={onSetSelectedCategory}
                  onEdit={onEditCategory}
                  onSave={onSaveCategory}
                  onCancel={onCancelEditCategory}
                  onDelete={onDeleteCategory}
                  onFormChange={onCategoryFormChange}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Category Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: isAddingCategory ? 1 : 0.7,
              x: 0,
              scale: isAddingCategory ? 1 : 0.95,
            }}
            className="flex-shrink-0"
          >
            <AddCategoryCard
              isVisible={isAddingCategory}
              form={categoryForm}
              onFormChange={onCategoryFormChange}
              onAdd={onAddCategory}
              onCancel={onCancelAddCategory}
            />
          </motion.div>
        </div>

        {/* Scroll Indicators */}
        <div className="pointer-events-none absolute bottom-4 right-0 top-0 w-8 bg-gradient-to-l from-white to-transparent opacity-75"></div>
      </div>
    </div>
  );
};

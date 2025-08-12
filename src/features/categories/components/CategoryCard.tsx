import React from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Save, X } from "lucide-react";
import { Category, CategoryFormData } from "../types";
import { COMMON_ICONS } from "../constants";

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  isEditing: boolean;
  editForm: CategoryFormData;
  onSelect: (id: number) => void;
  onEdit: (category: Category) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  onFormChange: (form: CategoryFormData) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  isEditing,
  editForm,
  onSelect,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFormChange,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
        isSelected
          ? "border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg shadow-indigo-200/50"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
      }`}
      onClick={() => !isEditing && onSelect(category.id)}
    >
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-60 space-y-3 p-4"
        >
          <div className="relative">
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => onFormChange({ ...editForm, name: e.target.value })}
              className="w-full rounded-xl border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Category name"
              autoFocus
            />
          </div>

          <div className="grid max-h-20 grid-cols-6 gap-1 overflow-y-auto">
            {COMMON_ICONS.map((icon) => (
              <motion.button
                key={icon}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onFormChange({ ...editForm, icon });
                }}
                className={`aspect-square rounded-lg text-lg transition-colors ${
                  editForm.icon === icon
                    ? "bg-indigo-100 text-indigo-600 ring-2 ring-indigo-300"
                    : "hover:bg-gray-100"
                }`}
              >
                {icon}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-3 py-2 text-sm text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <Save size={14} className="mx-auto" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              className="flex-1 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 px-3 py-2 text-sm text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <X size={14} className="mx-auto" />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="flex min-w-max items-center gap-3 px-4 py-3">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 10 }}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-medium ${
              isSelected
                ? "bg-gradient-to-br from-indigo-400 to-purple-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600"
            }`}
          >
            {category.icon}
          </motion.div>

          {/* Content */}
          <div className="flex min-w-0 flex-col">
            <h3
              className={`truncate text-sm font-semibold ${
                isSelected ? "text-indigo-900" : "text-gray-800"
              }`}
            >
              {category.name}
            </h3>
            <p className={`text-xs ${isSelected ? "text-indigo-600" : "text-gray-500"}`}>
              {category.productCount} {category.productCount === 1 ? "item" : "items"}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex items-center gap-1 transition-opacity duration-200 ${
              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(category);
              }}
              className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-indigo-100 hover:text-indigo-600"
            >
              <Edit3 size={12} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("Are you sure you want to delete this category?")) {
                  onDelete(category.id);
                }
              }}
              className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"
            >
              <Trash2 size={12} />
            </motion.button>
          </div>
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          layoutId="selected-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500"
          initial={false}
        />
      )}
    </motion.div>
  );
};

// import React from "react";
// import { Edit3, Trash2, Save, X } from "lucide-react";
// import { Category, CategoryFormData } from "../types";
// import { COMMON_ICONS } from "../constants";

// interface CategoryCardProps {
//   category: Category;
//   isSelected: boolean;
//   isEditing: boolean;
//   editForm: CategoryFormData;
//   onSelect: (id: number) => void;
//   onEdit: (category: Category) => void;
//   onSave: () => void;
//   onCancel: () => void;
//   onDelete: (id: number) => void;
//   onFormChange: (form: CategoryFormData) => void;
// }

// export const CategoryCard: React.FC<CategoryCardProps> = ({
//   category,
//   isSelected,
//   isEditing,
//   editForm,
//   onSelect,
//   onEdit,
//   onSave,
//   onCancel,
//   onDelete,
//   onFormChange,
// }) => (
//   <div
//     className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
//       isSelected ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-gray-300"
//     }`}
//     onClick={() => onSelect(category.id)}
//   >
//     {isEditing ? (
//       <div className="space-y-3">
//         <input
//           type="text"
//           value={editForm.name}
//           onChange={(e) => onFormChange({ ...editForm, name: e.target.value })}
//           className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           placeholder="Category name"
//         />
//         <div className="flex flex-wrap gap-1">
//           {COMMON_ICONS.map((icon) => (
//             <button
//               key={icon}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onFormChange({ ...editForm, icon });
//               }}
//               className={`h-8 w-8 rounded text-lg hover:bg-gray-100 ${
//                 editForm.icon === icon ? "bg-pink-100" : ""
//               }`}
//             >
//               {icon}
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onSave();
//             }}
//             className="flex-1 rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700"
//           >
//             <Save size={14} />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onCancel();
//             }}
//             className="flex-1 rounded bg-gray-600 px-2 py-1 text-sm text-white hover:bg-gray-700"
//           >
//             <X size={14} />
//           </button>
//         </div>
//       </div>
//     ) : (
//       <>
//         <div className="mb-3 text-center">
//           <div className="mb-2 text-3xl">{category.icon}</div>
//           <h3 className="font-medium text-gray-800">{category.name}</h3>
//           <p className="text-sm text-gray-500">{category.productCount} items</p>
//         </div>
//         <div className="flex justify-center gap-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onEdit(category);
//             }}
//             className="rounded p-1 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
//           >
//             <Edit3 size={14} />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               if (window.confirm("Are you sure you want to delete this category?")) {
//                 onDelete(category.id);
//               }
//             }}
//             className="rounded p-1 text-gray-600 hover:bg-red-50 hover:text-red-600"
//           >
//             <Trash2 size={14} />
//           </button>
//         </div>
//       </>
//     )}
//   </div>
// );

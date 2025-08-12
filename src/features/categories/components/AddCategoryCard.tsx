import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, X } from "lucide-react";
import { CategoryFormData } from "../types";
import { COMMON_ICONS } from "../constants";

interface AddCategoryCardProps {
  isVisible: boolean;
  form: CategoryFormData;
  onFormChange: (form: CategoryFormData) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export const AddCategoryCard: React.FC<AddCategoryCardProps> = ({
  isVisible,
  form,
  onFormChange,
  onAdd,
  onCancel,
}) => {
  return (
    <AnimatePresence mode="wait">
      {!isVisible ? (
        <motion.div
          key="add-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-16 min-w-max cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 transition-all hover:border-indigo-400 hover:bg-indigo-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-400 to-gray-500 text-white">
            <Plus size={20} />
          </div>
          <span className="text-sm font-medium text-gray-600">Add Category</span>
        </motion.div>
      ) : (
        <motion.div
          key="add-form"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="w-72 flex-shrink-0 rounded-2xl border border-indigo-200 bg-gradient-to-br from-white to-indigo-50 p-4 shadow-lg"
        >
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">New Category</h3>
              <p className="text-sm text-gray-500">Create a new wardrobe category</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => onFormChange({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border-gray-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="e.g., Shirts, Pants, Shoes"
                  autoFocus
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Choose Icon</label>
                <div className="grid max-h-24 grid-cols-6 gap-1 overflow-y-auto rounded-lg border bg-white p-1">
                  {COMMON_ICONS.map((icon) => (
                    <motion.button
                      key={icon}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onFormChange({ ...form, icon })}
                      className={`aspect-square rounded-lg text-lg transition-all ${
                        form.icon === icon
                          ? "bg-indigo-100 text-indigo-600 ring-2 ring-indigo-300"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAdd}
                disabled={!form.name.trim()}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={16} className="mx-auto" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
                className="flex-1 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <X size={16} className="mx-auto" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// import React from "react";
// import { CategoryFormData } from "../types";
// import { COMMON_ICONS } from "../constants";

// interface AddCategoryCardProps {
//   isVisible: boolean;
//   form: CategoryFormData;
//   onFormChange: (form: CategoryFormData) => void;
//   onAdd: () => void;
//   onCancel: () => void;
// }

// export const AddCategoryCard: React.FC<AddCategoryCardProps> = ({
//   isVisible,
//   form,
//   onFormChange,
//   onAdd,
//   onCancel,
// }) => {
//   if (!isVisible) return null;

//   return (
//     <div className="rounded-lg border-2 border-dashed border-pink-300 bg-pink-50 p-4">
//       <div className="space-y-3">
//         <input
//           type="text"
//           value={form.name}
//           onChange={(e) => onFormChange({ ...form, name: e.target.value })}
//           placeholder="Category name *"
//           className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//         />
//         <div className="mb-2 text-sm text-gray-600">Choose an icon:</div>
//         <div className="flex flex-wrap gap-1">
//           {COMMON_ICONS.map((icon) => (
//             <button
//               key={icon}
//               onClick={() => onFormChange({ ...form, icon })}
//               className={`h-8 w-8 rounded text-lg hover:bg-white ${
//                 form.icon === icon ? "bg-white shadow" : ""
//               }`}
//             >
//               {icon}
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={onAdd}
//             className="flex-1 rounded-lg bg-pink-600 py-2 text-white hover:bg-pink-700"
//           >
//             Add
//           </button>
//           <button
//             onClick={onCancel}
//             className="flex-1 rounded-lg bg-gray-300 py-2 text-gray-700 hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

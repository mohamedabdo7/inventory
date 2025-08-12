// components/AddProductForm.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductFormData } from "../types";
import { FormInput } from "../../../components/common/FormInput";
import { FormTextarea } from "../../../components/common/FormTextarea";
import { FileUpload } from "../../../components/common/FileUpload";

interface AddProductFormProps {
  isVisible: boolean;
  form: ProductFormData;
  onFormChange: (form: ProductFormData) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  isVisible,
  form,
  onFormChange,
  onAdd,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-indigo-50 p-6 shadow-inner"
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Add New Item</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label="Item Name"
              value={form.name}
              onChange={(value) => onFormChange({ ...form, name: value })}
              placeholder="e.g., Blue Denim Jeans"
              required
            />
            <FormInput
              label="Brand"
              value={form.brand}
              onChange={(value) => onFormChange({ ...form, brand: value })}
              placeholder="e.g., Nike, Zara, H&M"
            />
            <FormInput
              label="Size"
              value={form.size}
              onChange={(value) => onFormChange({ ...form, size: value })}
              placeholder="e.g., M, L, 32W x 30L, 9.5"
            />
            <FormInput
              label="Color"
              value={form.color}
              onChange={(value) => onFormChange({ ...form, color: value })}
              placeholder="e.g., Navy Blue, Black, Red"
            />
            <div className="md:col-span-2">
              <FormTextarea
                label="Description"
                value={form.description}
                onChange={(value) => onFormChange({ ...form, description: value })}
                placeholder="Additional details about the item"
              />
            </div>
            <div className="md:col-span-2">
              <FileUpload
                attachments={form.attachments}
                onChange={(attachments) => onFormChange({ ...form, attachments })}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAdd}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Add Item
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              className="rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 px-6 py-2 text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// // components/AddProductForm.tsx
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ProductFormData } from "../types";
// import { FormInput } from "../../../components/common/FormInput";
// import { FormTextarea } from "../../../components/common/FormTextarea";
// import { FileUpload } from "../../../components/common/FileUpload";

// interface AddProductFormProps {
//   isVisible: boolean;
//   form: ProductFormData;
//   onFormChange: (form: ProductFormData) => void;
//   onAdd: () => void;
//   onCancel: () => void;
// }

// export const AddProductForm: React.FC<AddProductFormProps> = ({
//   isVisible,
//   form,
//   onFormChange,
//   onAdd,
//   onCancel,
// }) => {
//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           className="mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-indigo-50 p-6 shadow-inner"
//         >
//           <h3 className="mb-4 text-lg font-semibold text-gray-800">Add New Item</h3>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <FormInput
//               label="Item Name"
//               value={form.name}
//               onChange={(value) => onFormChange({ ...form, name: value })}
//               placeholder="e.g., Blue Denim Jeans"
//               required
//             />
//             <FormInput
//               label="Brand"
//               value={form.brand}
//               onChange={(value) => onFormChange({ ...form, brand: value })}
//               placeholder="e.g., Nike, Zara, H&M"
//             />
//             <FormInput
//               label="Size"
//               value={form.size}
//               onChange={(value) => onFormChange({ ...form, size: value })}
//               placeholder="e.g., M, L, 32W x 30L, 9.5"
//             />
//             <FormInput
//               label="Color"
//               value={form.color}
//               onChange={(value) => onFormChange({ ...form, color: value })}
//               placeholder="e.g., Navy Blue, Black, Red"
//             />
//             <div className="md:col-span-2">
//               <FormTextarea
//                 label="Description"
//                 value={form.description}
//                 onChange={(value) => onFormChange({ ...form, description: value })}
//                 placeholder="Additional details about the item"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <FileUpload
//                 attachments={form.attachments}
//                 onChange={(attachments) => onFormChange({ ...form, attachments })}
//               />
//             </div>
//           </div>
//           <div className="mt-6 flex gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={onAdd}
//               className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
//             >
//               Add Item
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={onCancel}
//               className="rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 px-6 py-2 text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
//             >
//               Cancel
//             </motion.button>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

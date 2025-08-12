import React, { useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import { Product, ProductFormData } from "../types";
import { usePackStore } from "@/store/packStore";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

function fmtKg(v?: number) {
  if (v == null) return "-";
  const n = Number.isFinite(v) ? v : 0;
  return `${n.toFixed(n % 1 === 0 ? 0 : 2)} kg`;
}

const STATIC_MEDIA = [
  { src: "/images/product1.png", alt: "Main product photo" },
  { src: "/images/product2.png", alt: "Side angle" },
  { src: "/images/product3.png", alt: "Packaging" },
  { src: "/images/product4.png", alt: "In use" },
];

interface ProductCardProps {
  product: Product;
  isEditing: boolean;
  editForm: ProductFormData;
  onEdit: (product: Product) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  onFormChange: (form: ProductFormData) => void;
}

const StaticMediaGallery: React.FC = () => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Main media */}
      <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg border">
        <img
          src={STATIC_MEDIA[active].src}
          alt={STATIC_MEDIA[active].alt}
          className="h-full w-full object-cover"
        />
      </AspectRatio>

      {/* Thumbnails */}
      <ScrollArea className="mt-2 w-full whitespace-nowrap rounded-md border p-2">
        <div className="flex gap-2">
          {STATIC_MEDIA.map((m, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded border ${
                i === active ? "ring-2 ring-purple-500" : "opacity-80 hover:opacity-100"
              }`}
            >
              <img src={m.src} alt={m.alt} className="h-full w-full object-cover" />
            </button>
          ))}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="ml-2">
                View full
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-2 sm:p-4">
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
                <img
                  src={STATIC_MEDIA[active].src}
                  alt={STATIC_MEDIA[active].alt}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isEditing,
  editForm,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFormChange,
}) => (
  <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
    {isEditing ? (
      <div className="space-y-3">
        {/* your existing edit fields unchanged */}
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => onFormChange({ ...editForm, name: e.target.value })}
          className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Item name *"
        />
        <input
          type="text"
          value={editForm.brand}
          onChange={(e) => onFormChange({ ...editForm, brand: e.target.value })}
          className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Brand"
        />
        <input
          type="text"
          value={editForm.size}
          onChange={(e) => onFormChange({ ...editForm, size: e.target.value })}
          className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Size"
        />
        <input
          type="text"
          value={editForm.color}
          onChange={(e) => onFormChange({ ...editForm, color: e.target.value })}
          className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Color"
        />
        <input
          type="number"
          step="0.01"
          value={editForm.weight ?? ""}
          onChange={(e) =>
            onFormChange({
              ...editForm,
              weight:
                e.target.value === "" ? undefined : Math.max(0, parseFloat(e.target.value) || 0),
            })
          }
          className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Weight (kg)"
        />
        <textarea
          value={editForm.description}
          onChange={(e) => onFormChange({ ...editForm, description: e.target.value })}
          className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Description"
          rows={2}
        />
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="flex-1 rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded bg-gray-600 px-2 py-1 text-sm text-white hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <>
        <div className="mb-3">
          <h3 className="mb-1 font-medium text-gray-800">{product.name}</h3>
          <p className="mb-2 text-sm text-gray-600">{product.description}</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div>
              <span className="font-medium">Brand:</span> {product.brand}
            </div>
            <div>
              <span className="font-medium">Size:</span> {product.size}
            </div>
            <div>
              <span className="font-medium">Color:</span> {product.color}
            </div>
            <div>
              <span className="font-medium">Weight:</span> {fmtKg(product.weight)}
            </div>
          </div>
        </div>

        {/* 🔹 Static media gallery (shadcn/ui) */}
        <StaticMediaGallery />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(product)}
            className="rounded p-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            title="Edit"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this item?")) {
                onDelete(product.id);
              }
            }}
            className="rounded p-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <button
          onClick={() => {
            const add = usePackStore.getState().addToPack;
            add(
              {
                id: String(product.id),
                name: product.name,
                categoryId: product.categoryId ? String(product.categoryId) : undefined,
                thumbnail: (product as any).attachments?.[0]?.url,
                weight: product.weight,
              },
              1
            );
          }}
          className="mt-2 rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
        >
          أضِف للشنطة
        </button>
      </>
    )}
  </div>
);

// import React from "react";
// import { Edit3, Trash2 } from "lucide-react";
// import { Product, ProductFormData } from "../types";
// import { usePackStore } from "@/store/packStore";

// function fmtKg(v?: number) {
//   if (v == null) return "-";
//   const n = Number.isFinite(v) ? v : 0;
//   return `${n.toFixed(n % 1 === 0 ? 0 : 2)} kg`;
// }

// interface ProductCardProps {
//   product: Product;
//   isEditing: boolean;
//   editForm: ProductFormData;
//   onEdit: (product: Product) => void;
//   onSave: () => void;
//   onCancel: () => void;
//   onDelete: (id: number) => void;
//   onFormChange: (form: ProductFormData) => void;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   isEditing,
//   editForm,
//   onEdit,
//   onSave,
//   onCancel,
//   onDelete,
//   onFormChange,
// }) => (
//   <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
//     {isEditing ? (
//       <div className="space-y-3">
//         <input
//           type="text"
//           value={editForm.name}
//           onChange={(e) => onFormChange({ ...editForm, name: e.target.value })}
//           className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Item name *"
//         />
//         <input
//           type="text"
//           value={editForm.brand}
//           onChange={(e) => onFormChange({ ...editForm, brand: e.target.value })}
//           className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Brand"
//         />
//         <input
//           type="text"
//           value={editForm.size}
//           onChange={(e) => onFormChange({ ...editForm, size: e.target.value })}
//           className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Size"
//         />
//         <input
//           type="text"
//           value={editForm.color}
//           onChange={(e) => onFormChange({ ...editForm, color: e.target.value })}
//           className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Color"
//         />

//         {/* Weight (kg) */}
//         <input
//           type="number"
//           step="0.01"
//           value={editForm.weight ?? ""}
//           onChange={(e) =>
//             onFormChange({
//               ...editForm,
//               weight:
//                 e.target.value === "" ? undefined : Math.max(0, parseFloat(e.target.value) || 0),
//             })
//           }
//           className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Weight (kg)"
//         />

//         <textarea
//           value={editForm.description}
//           onChange={(e) => onFormChange({ ...editForm, description: e.target.value })}
//           className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           placeholder="Description"
//           rows={2}
//         />
//         <div className="flex gap-2">
//           <button
//             onClick={onSave}
//             className="flex-1 rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700"
//           >
//             Save
//           </button>
//           <button
//             onClick={onCancel}
//             className="flex-1 rounded bg-gray-600 px-2 py-1 text-sm text-white hover:bg-gray-700"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     ) : (
//       <>
//         <div className="mb-3">
//           <h3 className="mb-1 font-medium text-gray-800">{product.name}</h3>
//           <p className="mb-2 text-sm text-gray-600">{product.description}</p>
//           <div className="space-y-1 text-sm text-gray-500">
//             <div>
//               <span className="font-medium">Brand:</span> {product.brand}
//             </div>
//             <div>
//               <span className="font-medium">Size:</span> {product.size}
//             </div>
//             <div>
//               <span className="font-medium">Color:</span> {product.color}
//             </div>
//             <div>
//               <span className="font-medium">Weight:</span> {fmtKg(product.weight)}
//             </div>
//             {Array.isArray(product.attachments) && (product as any).attachments?.length > 0 && (
//               <div>
//                 <span className="font-medium">Photos:</span> {(product as any).attachments.length}{" "}
//                 photo(s)
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex justify-end gap-2">
//           <button
//             onClick={() => onEdit(product)}
//             className="rounded p-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
//             title="Edit"
//           >
//             <Edit3 size={16} />
//           </button>
//           <button
//             onClick={() => {
//               if (window.confirm("Are you sure you want to delete this item?")) {
//                 onDelete(product.id);
//               }
//             }}
//             className="rounded p-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
//             title="Delete"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>

//         <button
//           onClick={() => {
//             const add = usePackStore.getState().addToPack;
//             add(
//               {
//                 id: String(product.id),
//                 name: product.name,
//                 categoryId: product.categoryId ? String(product.categoryId) : undefined,
//                 thumbnail: (product as any).attachments?.[0]?.url,
//                 weight: product.weight,
//               },
//               1
//             );
//           }}
//           className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
//         >
//           أضِف للشنطة
//         </button>
//       </>
//     )}
//   </div>
// );

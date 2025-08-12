// src/features/pack/components/PackDrawer.tsx
import { useMemo, useState } from "react";
import type { PackItem } from "../types";
import {
  usePackStore,
  selectItems,
  selectTotalQty,
  selectTotalWeight,
  selectTotalWithBagWeight,
  selectRemainingAllowance,
  selectAllowance,
} from "@/store/packStore";
import { TemplateBar } from "./TemplateBar";

function kg(n?: number) {
  if (n == null) return "-";
  return Number(n).toFixed(2) + " كجم";
}

export function PackDrawer({
  open,
  onClose,
  categoryNameOf,
}: {
  open: boolean;
  onClose: () => void;
  categoryNameOf?: (id?: string) => string;
}) {
  const items = usePackStore(selectItems);
  const totalQty = usePackStore(selectTotalQty);
  const totalWeight = usePackStore(selectTotalWeight);
  const totalWithBagWeight = usePackStore(selectTotalWithBagWeight);
  const remainingAllowance = usePackStore(selectRemainingAllowance);
  const allowance = usePackStore(selectAllowance);

  const updatedAt = usePackStore((s) => s.pack.updatedAt);
  const templates = usePackStore((s) => s.templates);

  const {
    removeFromPack,
    setQty,
    setNote,
    clearPack,
    saveTemplate,
    loadTemplate,
    deleteTemplate,
    exportAsText,
    setAllowance,
  } = usePackStore();

  const [copied, setCopied] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, PackItem[]>();
    for (const it of items) {
      const key = it.categoryId || "__uncat";
      const arr = map.get(key) || [];
      arr.push(it);
      map.set(key, arr);
    }
    return map;
  }, [items]);

  const handleCopy = async () => {
    const txt = exportAsText(categoryNameOf);
    try {
      await navigator.clipboard.writeText(txt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("حدث خطأ في نسخ الحافظة");
    }
  };

  const status = useMemo(() => {
    if (allowance == null || Number.isNaN(allowance)) {
      return { text: "بدون حد وزن", tone: "neutral" as const };
    }
    if ((remainingAllowance ?? 0) >= 0) {
      return { text: `مسموح ✅ — المتبقي ${kg(remainingAllowance)}`, tone: "ok" as const };
    }
    return {
      text: `تجاوز الحد ❌ — زيادة ${kg(Math.abs(remainingAllowance || 0))}`,
      tone: "bad" as const,
    };
  }, [allowance, remainingAllowance]);

  const statusClasses =
    status.tone === "ok"
      ? "text-green-700 bg-green-50 border-green-200"
      : status.tone === "bad"
        ? "text-red-700 bg-red-50 border-red-200"
        : "text-gray-700 bg-gray-50 border-gray-200";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Make drawer a flex column so middle can scroll */}
        <div className="flex h-full flex-col">
          {/* Header (sticky) */}
          <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
            <div>
              <h3 className="text-lg font-semibold">شنطة السفر</h3>
              <p className="text-xs text-gray-500">
                آخر تحديث: {new Date(updatedAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              إغلاق
            </button>
          </header>

          {/* Summary + allowance (sticky section optional) */}
          <div className="border-b px-4 py-3">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-700">
              <div>
                العناصر: <span className="font-semibold">{items.length}</span> • الإجمالي:
                <span className="font-semibold"> {totalQty}</span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  وزن العناصر: <span className="font-semibold">{kg(totalWeight)}</span>
                </div>
                <div className="hidden sm:inline">
                  الإجمالي مع الشنطة:{" "}
                  <span className="font-semibold">{kg(totalWithBagWeight)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm">
                حد شركة الطيران (كجم):
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  value={allowance ?? ""}
                  onChange={(e) =>
                    setAllowance(
                      e.target.value === ""
                        ? undefined
                        : Math.max(0, parseFloat(e.target.value) || 0)
                    )
                  }
                  className="w-28 rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="مثال 23"
                />
              </label>

              <div
                className={`rounded-md border px-3 py-1.5 text-xs sm:text-sm ${statusClasses}`}
                role="status"
              >
                {status.text}
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-700 sm:hidden">
              الإجمالي مع الشنطة: <span className="font-semibold">{kg(totalWithBagWeight)}</span>
            </div>
          </div>

          {/* Scrollable content area */}
          <div
            className="min-h-0 flex-1 overflow-y-auto px-2 pb-24 pt-1"
            style={{ WebkitOverflowScrolling: "touch" }} // smooth iOS scrolling
          >
            {!items.length && (
              <div className="mt-16 px-6 text-center text-gray-500">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  🧳
                </div>
                شنطتك لسه فاضية — أضِف عناصر من الدولاب.
              </div>
            )}

            {[...grouped.entries()].map(([catId, arr]) => (
              <section key={catId} className="px-2 py-3">
                <h4 className="mb-2 text-sm font-semibold text-gray-700">
                  {categoryNameOf ? categoryNameOf(catId) : catId}
                </h4>
                <ul className="space-y-2">
                  {arr.map((it) => (
                    <li key={it.id} className="flex items-center gap-3 rounded-xl border p-2">
                      {it.thumbnail ? (
                        <img
                          src={it.thumbnail}
                          alt=""
                          className="h-12 w-12 flex-none rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 flex-none rounded-lg bg-gray-100" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="truncate font-medium">{it.name}</div>
                          <button
                            onClick={() => removeFromPack(it.id)}
                            className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                          >
                            حذف
                          </button>
                        </div>

                        <div className="mt-1 text-xs text-gray-600">
                          وزن القطعة: <span className="tabular-nums">{kg(it.weight)}</span>
                          {typeof it.weight === "number" && (
                            <>
                              {" "}
                              • الإجمالي:{" "}
                              <span className="tabular-nums">
                                {kg((it.weight || 0) * (it.qty || 0))}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="mt-2 flex items-center gap-3 text-sm">
                          <div className="inline-flex items-center rounded-lg border">
                            <button
                              onClick={() => setQty(it.id, Math.max(0, (it.qty || 0) - 1))}
                              className="px-2 py-1"
                              aria-label="decrease"
                            >
                              −
                            </button>
                            <span className="px-3 py-1 tabular-nums">{it.qty}</span>
                            <button
                              onClick={() => setQty(it.id, (it.qty || 0) + 1)}
                              className="px-2 py-1"
                              aria-label="increase"
                            >
                              +
                            </button>
                          </div>
                          <input
                            value={it.note || ""}
                            onChange={(e) => setNote(it.id, e.target.value)}
                            placeholder="ملاحظة (اختياري)"
                            className="flex-1 rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Footer (sticky inside the drawer) */}
          <footer className="sticky bottom-0 z-10 border-t bg-white p-3">
            <TemplateBar
              onSave={(name, season) => saveTemplate(name, season)}
              templates={templates}
              onLoad={(id) => loadTemplate(id)}
              onDelete={(id) => deleteTemplate(id)}
            />
            {/* actions row */}
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                onClick={handleCopy}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                title="نسخ القائمة كنص"
              >
                {copied ? "تم النسخ" : "نسخ كنص"}
              </button>
              <button
                onClick={clearPack}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                title="تفريغ الشنطة"
              >
                تفريغ
              </button>
            </div>
          </footer>
        </div>
      </aside>
    </>
  );
}

// import React, { useMemo, useState } from "react";
// import type { PackItem } from "../types";
// import {
//   usePackStore,
//   selectItems,
//   selectTotalQty,
//   selectTotalWeight,
//   selectTotalWithBagWeight,
//   selectRemainingAllowance,
//   selectAllowance,
// } from "@/store/packStore";
// import { TemplateBar } from "./TemplateBar";

// function kg(n?: number) {
//   if (n == null) return "-";
//   return Number(n).toFixed(2) + " كجم";
// }

// export function PackDrawer({
//   open,
//   onClose,
//   categoryNameOf,
// }: {
//   open: boolean;
//   onClose: () => void;
//   categoryNameOf?: (id?: string) => string;
// }) {
//   // --- derived via selectors (لا تعتمد على getters مباشرة)
//   const items = usePackStore(selectItems);
//   const totalQty = usePackStore(selectTotalQty);
//   const totalWeight = usePackStore(selectTotalWeight);
//   const totalWithBagWeight = usePackStore(selectTotalWithBagWeight);
//   const remainingAllowance = usePackStore(selectRemainingAllowance);
//   const allowance = usePackStore(selectAllowance);

//   const updatedAt = usePackStore((s) => s.pack.updatedAt);
//   const templates = usePackStore((s) => s.templates);

//   const {
//     removeFromPack,
//     setQty,
//     setNote,
//     clearPack,
//     saveTemplate,
//     loadTemplate,
//     deleteTemplate,
//     exportAsText,
//     setAllowance,
//   } = usePackStore();

//   const [copied, setCopied] = useState(false);

//   const grouped = useMemo(() => {
//     const map = new Map<string, PackItem[]>();
//     for (const it of items) {
//       const key = it.categoryId || "__uncat";
//       const arr = map.get(key) || [];
//       arr.push(it);
//       map.set(key, arr);
//     }
//     return map;
//   }, [items]);

//   const handleCopy = async () => {
//     const txt = exportAsText(categoryNameOf);
//     try {
//       await navigator.clipboard.writeText(txt);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch {}
//   };

//   // الحالة النصية واللون حسب الحد
//   const status = useMemo(() => {
//     if (allowance == null || Number.isNaN(allowance)) {
//       return { text: "بدون حد وزن", tone: "neutral" as const };
//     }
//     if ((remainingAllowance ?? 0) >= 0) {
//       return {
//         text: `مسموح ✅ — المتبقي ${kg(remainingAllowance)}`,
//         tone: "ok" as const,
//       };
//     }
//     return {
//       text: `تجاوز الحد ❌ — زيادة ${kg(Math.abs(remainingAllowance || 0))}`,
//       tone: "bad" as const,
//     };
//   }, [allowance, remainingAllowance]);

//   const statusClasses =
//     status.tone === "ok"
//       ? "text-green-700 bg-green-50 border-green-200"
//       : status.tone === "bad"
//         ? "text-red-700 bg-red-50 border-red-200"
//         : "text-gray-700 bg-gray-50 border-gray-200";

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
//           open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
//         }`}
//         onClick={onClose}
//       />

//       {/* Panel */}
//       <aside
//         className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//         role="dialog"
//         aria-modal="true"
//       >
//         <header className="sticky top-0 flex items-center justify-between border-b bg-white px-4 py-3">
//           <div>
//             <h3 className="text-lg font-semibold">شنطة السفر</h3>
//             <p className="text-xs text-gray-500">
//               آخر تحديث: {new Date(updatedAt).toLocaleString()}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50"
//           >
//             إغلاق
//           </button>
//         </header>

//         {/* Summary + allowance input */}
//         <div className="border-b px-4 py-3">
//           <div className="mb-2 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-700">
//             <div>
//               العناصر: <span className="font-semibold">{items.length}</span> • الإجمالي:
//               <span className="font-semibold"> {totalQty}</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <div>
//                 وزن العناصر: <span className="font-semibold">{kg(totalWeight)}</span>
//               </div>
//               <div className="hidden sm:inline">
//                 الإجمالي مع الشنطة: <span className="font-semibold">{kg(totalWithBagWeight)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//             <label className="flex items-center gap-2 text-sm">
//               حد شركة الطيران (كجم):
//               <input
//                 type="number"
//                 step="0.1"
//                 min={0}
//                 value={allowance ?? ""}
//                 onChange={(e) =>
//                   setAllowance(
//                     e.target.value === "" ? undefined : Math.max(0, parseFloat(e.target.value) || 0)
//                   )
//                 }
//                 className="w-28 rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="مثال 23"
//               />
//             </label>

//             <div
//               className={`rounded-md border px-3 py-1.5 text-xs sm:text-sm ${statusClasses}`}
//               role="status"
//             >
//               {status.text}
//             </div>
//           </div>

//           {/* إجمالي مع الشنطة يظهر على الشاشات الصغيرة تحت */}
//           <div className="mt-2 text-sm text-gray-700 sm:hidden">
//             الإجمالي مع الشنطة: <span className="font-semibold">{kg(totalWithBagWeight)}</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between px-4 py-2">
//           <div className="text-sm text-gray-700" />
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleCopy}
//               className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
//               title="نسخ القائمة كنص"
//             >
//               {copied ? "تم النسخ" : "نسخ كنص"}
//             </button>
//             <button
//               onClick={clearPack}
//               className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
//               title="تفريغ الشنطة"
//             >
//               تفريغ
//             </button>
//           </div>
//         </div>

//         {/* Empty state */}
//         {!items.length && (
//           <div className="mt-16 px-6 text-center text-gray-500">
//             <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
//               🧳
//             </div>
//             شنطتك لسه فاضية — أضِف عناصر من الدولاب.
//           </div>
//         )}

//         {/* Items */}
//         <div className="overflow-y-auto px-2 pb-28 pt-1">
//           {[...grouped.entries()].map(([catId, arr]) => (
//             <section key={catId} className="px-2 py-3">
//               <h4 className="mb-2 text-sm font-semibold text-gray-700">
//                 {categoryNameOf ? categoryNameOf(catId) : catId}
//               </h4>
//               <ul className="space-y-2">
//                 {arr.map((it) => (
//                   <li key={it.id} className="flex items-center gap-3 rounded-xl border p-2">
//                     {it.thumbnail ? (
//                       <img
//                         src={it.thumbnail}
//                         alt=""
//                         className="h-12 w-12 flex-none rounded-lg object-cover"
//                       />
//                     ) : (
//                       <div className="h-12 w-12 flex-none rounded-lg bg-gray-100" />
//                     )}
//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-center justify-between gap-3">
//                         <div className="truncate font-medium">{it.name}</div>
//                         <button
//                           onClick={() => removeFromPack(it.id)}
//                           className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
//                         >
//                           حذف
//                         </button>
//                       </div>

//                       {/* وزن كل عنصر */}
//                       <div className="mt-1 text-xs text-gray-600">
//                         وزن القطعة: <span className="tabular-nums">{kg(it.weight)}</span>
//                         {typeof it.weight === "number" && (
//                           <>
//                             {" "}
//                             • الإجمالي:{" "}
//                             <span className="tabular-nums">
//                               {kg((it.weight || 0) * (it.qty || 0))}
//                             </span>
//                           </>
//                         )}
//                       </div>

//                       <div className="mt-2 flex items-center gap-3 text-sm">
//                         <div className="inline-flex items-center rounded-lg border">
//                           <button
//                             onClick={() => setQty(it.id, Math.max(0, (it.qty || 0) - 1))}
//                             className="px-2 py-1"
//                             aria-label="decrease"
//                           >
//                             −
//                           </button>
//                           <span className="px-3 py-1 tabular-nums">{it.qty}</span>
//                           <button
//                             onClick={() => setQty(it.id, (it.qty || 0) + 1)}
//                             className="px-2 py-1"
//                             aria-label="increase"
//                           >
//                             +
//                           </button>
//                         </div>
//                         <input
//                           value={it.note || ""}
//                           onChange={(e) => setNote(it.id, e.target.value)}
//                           placeholder="ملاحظة (اختياري)"
//                           className="flex-1 rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
//                         />
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </section>
//           ))}
//         </div>

//         {/* Footer actions */}
//         <footer className="fixed bottom-0 right-0 z-50 w-full max-w-md border-t bg-white p-3">
//           <TemplateBar
//             onSave={(name, season) => saveTemplate(name, season)}
//             templates={templates}
//             onLoad={(id) => loadTemplate(id)}
//             onDelete={(id) => deleteTemplate(id)}
//           />
//         </footer>
//       </aside>
//     </>
//   );
// }

// // src/features/pack/components/PackDrawer.tsx
// import React, { useMemo, useState } from "react";
// import type { PackItem } from "../types";
// import { usePackStore } from "@/store/packStore";
// import { TemplateBar } from "./TemplateBar";

// export function PackDrawer({
//   open,
//   onClose,
//   categoryNameOf,
// }: {
//   open: boolean;
//   onClose: () => void;
//   categoryNameOf?: (id?: string) => string;
// }) {
//   const { items, updatedAt } = usePackStore((s) => s.pack);
//   const totalQty = usePackStore((s) => s.totalQty);
//   const {
//     removeFromPack,
//     setQty,
//     setNote,
//     clearPack,
//     saveTemplate,
//     loadTemplate,
//     deleteTemplate,
//     exportAsText,
//   } = usePackStore();
//   const templates = usePackStore((s) => s.templates);

//   const [copied, setCopied] = useState(false);

//   const grouped = useMemo(() => {
//     const map = new Map<string, PackItem[]>();
//     for (const it of items) {
//       const key = it.categoryId || "__uncat";
//       const arr = map.get(key) || [];
//       arr.push(it);
//       map.set(key, arr);
//     }
//     return map;
//   }, [items]);

//   const handleCopy = async () => {
//     const txt = exportAsText(categoryNameOf);
//     try {
//       await navigator.clipboard.writeText(txt);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch {}
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
//           open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
//         }`}
//         onClick={onClose}
//       />

//       {/* Panel */}
//       <aside
//         className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//         role="dialog"
//         aria-modal="true"
//       >
//         <header className="sticky top-0 flex items-center justify-between border-b bg-white px-4 py-3">
//           <div>
//             <h3 className="text-lg font-semibold">شنطة السفر</h3>
//             <p className="text-xs text-gray-500">
//               آخر تحديث: {new Date(updatedAt).toLocaleString()}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50"
//           >
//             إغلاق
//           </button>
//         </header>

//         <div className="flex items-center justify-between px-4 py-2">
//           <div className="text-sm text-gray-700">
//             العناصر: <span className="font-semibold">{items.length}</span> • الإجمالي:{" "}
//             <span className="font-semibold">{totalQty}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleCopy}
//               className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
//               title="نسخ القائمة كنص"
//             >
//               {copied ? "تم النسخ" : "نسخ كنص"}
//             </button>
//             <button
//               onClick={clearPack}
//               className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
//               title="تفريغ الشنطة"
//             >
//               تفريغ
//             </button>
//           </div>
//         </div>

//         {/* Empty state */}
//         {!items.length && (
//           <div className="mt-16 px-6 text-center text-gray-500">
//             <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
//               🧳
//             </div>
//             شنطتك لسه فاضية — أضِف عناصر من الدولاب.
//           </div>
//         )}

//         {/* Items */}
//         <div className="overflow-y-auto px-2 pb-28 pt-1">
//           {[...grouped.entries()].map(([catId, arr]) => (
//             <section key={catId} className="px-2 py-3">
//               <h4 className="mb-2 text-sm font-semibold text-gray-700">
//                 {categoryNameOf ? categoryNameOf(catId) : catId}
//               </h4>
//               <ul className="space-y-2">
//                 {arr.map((it) => (
//                   <li key={it.id} className="flex items-center gap-3 rounded-xl border p-2">
//                     {it.thumbnail ? (
//                       <img
//                         src={it.thumbnail}
//                         alt=""
//                         className="h-12 w-12 flex-none rounded-lg object-cover"
//                       />
//                     ) : (
//                       <div className="h-12 w-12 flex-none rounded-lg bg-gray-100" />
//                     )}
//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-center justify-between gap-3">
//                         <div className="truncate font-medium">{it.name}</div>
//                         <button
//                           onClick={() => removeFromPack(it.id)}
//                           className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
//                         >
//                           حذف
//                         </button>
//                       </div>
//                       <div className="mt-2 flex items-center gap-3 text-sm">
//                         <div className="inline-flex items-center rounded-lg border">
//                           <button
//                             onClick={() => setQty(it.id, Math.max(0, (it.qty || 0) - 1))}
//                             className="px-2 py-1"
//                             aria-label="decrease"
//                           >
//                             −
//                           </button>
//                           <span className="px-3 py-1 tabular-nums">{it.qty}</span>
//                           <button
//                             onClick={() => setQty(it.id, (it.qty || 0) + 1)}
//                             className="px-2 py-1"
//                             aria-label="increase"
//                           >
//                             +
//                           </button>
//                         </div>
//                         <input
//                           value={it.note || ""}
//                           onChange={(e) => setNote(it.id, e.target.value)}
//                           placeholder="ملاحظة (اختياري)"
//                           className="flex-1 rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
//                         />
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </section>
//           ))}
//         </div>

//         {/* Footer actions */}
//         <footer className="fixed bottom-0 right-0 z-50 w-full max-w-md border-t bg-white p-3">
//           <TemplateBar
//             onSave={(name, season) => saveTemplate(name, season)}
//             templates={templates}
//             onLoad={(id) => loadTemplate(id)}
//             onDelete={(id) => deleteTemplate(id)}
//           />
//         </footer>
//       </aside>
//     </>
//   );
// }

// features/pack/components/PackDrawer.tsx
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { X, Package, Plus, Minus, Trash2, Settings, AlertTriangle } from "lucide-react";
import {
  usePackStore,
  selectItems,
  selectTotalWeight,
  selectTotalWithBagWeight,
  selectRemainingAllowance,
} from "@/store/packStore";
import { Season, TripType } from "../../categories/travelEssentials";
import { MissingEssentialsAlert } from "./MissingEssentialsAlert";
import { TravelEssentialsManager } from "./TravelEssentialsManager";

interface PackDrawerProps {
  open: boolean;
  onClose: () => void;
  categoryNameOf?: (id?: string) => string;
}

export function PackDrawer({ open, onClose, categoryNameOf }: PackDrawerProps) {
  const [showEssentialsManager, setShowEssentialsManager] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<Season | undefined>();
  const [selectedTripType, setSelectedTripType] = useState<TripType | undefined>();

  const items = usePackStore(selectItems);
  const totalWeight = usePackStore(selectTotalWeight);
  const totalWithBag = usePackStore(selectTotalWithBagWeight);
  const remainingAllowance = usePackStore(selectRemainingAllowance);

  const {
    pack,
    setQty,
    removeFromPack,
    setNote,
    clearPack,
    setBagWeight,
    setAllowance,
    setItemWeight,
    exportAsText,
    addToPack,
  } = usePackStore();

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const grouped = new Map<string, typeof items>();
    items.forEach((item) => {
      const categoryId = item.categoryId?.toString() || "uncategorized";
      const existing = grouped.get(categoryId) || [];
      existing.push(item);
      grouped.set(categoryId, existing);
    });
    return grouped;
  }, [items]);

  const handleAddFromEssentials = (essentialName: string) => {
    // Create a minimal item from essential name
    const essentialItem = {
      id: `essential_${Date.now()}`,
      name: essentialName,
      categoryId: undefined,
      thumbnail: undefined,
      weight: undefined,
    };

    addToPack(essentialItem, 1, "مضاف من أساسيات السفر");
  };

  const handleExport = () => {
    const text = exportAsText(categoryNameOf);
    if (navigator.share) {
      navigator.share({
        title: "قائمة شنطة السفر",
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      // يمكن إضافة toast notification هنا
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose} />

      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-xl">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6" />
              <div>
                <h2 className="text-lg font-semibold">شنطة السفر</h2>
                <p className="text-sm text-blue-100">
                  {items.length} عنصر • {totalWeight.toFixed(1)} كيلو
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Trip Settings */}
          <div className="mt-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <select
                value={selectedSeason || ""}
                onChange={(e) => setSelectedSeason((e.target.value as Season) || undefined)}
                className="rounded border-blue-500 bg-blue-700 p-2 text-sm text-white"
              >
                <option value="">اختر الموسم</option>
                <option value="summer">☀️ صيف</option>
                <option value="winter">❄️ شتاء</option>
                <option value="spring">🌸 ربيع</option>
                <option value="fall">🍂 خريف</option>
              </select>

              <select
                value={selectedTripType || ""}
                onChange={(e) => setSelectedTripType((e.target.value as TripType) || undefined)}
                className="rounded border-blue-500 bg-blue-700 p-2 text-sm text-white"
              >
                <option value="">نوع الرحلة</option>
                <option value="business">💼 عمل</option>
                <option value="leisure">🏖️ ترفيه</option>
                <option value="adventure">🏔️ مغامرة</option>
                <option value="beach">🏖️ شاطئ</option>
                <option value="city">🏙️ مدينة</option>
                <option value="camping">⛺ تخييم</option>
              </select>
            </div>
          </div>
        </div>

        {/* Travel Essentials Alert */}
        <div className="border-b p-4">
          <MissingEssentialsAlert
            season={selectedSeason}
            tripType={selectedTripType}
            onAddToPackFromEssentials={handleAddFromEssentials}
          />
        </div>

        {/* Weight Summary */}
        <div className="space-y-2 border-b bg-gray-50 p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-gray-600">وزن الشنطة (كيلو)</label>
              <input
                type="number"
                value={pack.bagWeight || 0}
                onChange={(e) => setBagWeight(Number(e.target.value))}
                className="mt-1 w-full rounded border p-1 text-center"
                step="0.1"
                min="0"
              />
            </div>
            <div>
              <label className="text-gray-600">الحد المسموح (كيلو)</label>
              <input
                type="number"
                value={pack.allowance || ""}
                onChange={(e) => setAllowance(e.target.value ? Number(e.target.value) : undefined)}
                className="mt-1 w-full rounded border p-1 text-center"
                step="0.1"
                min="0"
                placeholder="اختياري"
              />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>وزن العناصر:</span>
              <span className="font-medium">{totalWeight.toFixed(1)} كيلو</span>
            </div>
            <div className="flex justify-between">
              <span>الإجمالي مع الشنطة:</span>
              <span className="font-medium">{totalWithBag.toFixed(1)} كيلو</span>
            </div>
            {remainingAllowance !== undefined && (
              <div
                className={`flex justify-between ${remainingAllowance < 0 ? "text-red-600" : "text-green-600"}`}
              >
                <span>المتبقي:</span>
                <span className="font-medium">
                  {remainingAllowance.toFixed(1)} كيلو
                  {remainingAllowance < 0 && <AlertTriangle className="ml-1 inline h-4 w-4" />}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 border-b p-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowEssentialsManager(true)}
            className="flex-1"
          >
            <Settings className="mr-2 h-4 w-4" />
            إدارة الأساسيات
          </Button>
          <Button size="sm" variant="outline" onClick={handleExport}>
            تصدير القائمة
          </Button>
          <Button size="sm" variant="outline" onClick={clearPack} className="text-red-600">
            مسح الكل
          </Button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-gray-500">
              <Package className="mb-3 h-12 w-12 text-gray-300" />
              <p className="text-center">
                شنطتك فارغة
                <br />
                <span className="text-sm">ابدأ بإضافة العناصر من دولابك</span>
              </p>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {Array.from(itemsByCategory.entries()).map(([categoryId, categoryItems]) => (
                <div key={categoryId} className="space-y-2">
                  <h3 className="border-b pb-1 text-sm font-semibold text-gray-700">
                    {categoryNameOf ? categoryNameOf(categoryId) : "غير مصنف"}
                    <span className="ml-2 text-gray-400">({categoryItems.length})</span>
                  </h3>

                  {categoryItems.map((item) => (
                    <div key={item.id} className="rounded-lg border bg-white p-3">
                      <div className="flex items-start gap-3">
                        {item.thumbnail && (
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        )}

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate font-medium text-gray-900">{item.name}</h4>

                          {item.note && <p className="mt-1 text-xs text-gray-500">{item.note}</p>}

                          {/* Quantity and Weight Controls */}
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setQty(item.id, (item.qty || 1) - 1)}
                                disabled={(item.qty || 1) <= 1}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.qty || 1}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setQty(item.id, (item.qty || 1) + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-1 text-xs">
                              <input
                                type="number"
                                value={item.weight || ""}
                                onChange={(e) =>
                                  setItemWeight(
                                    item.id,
                                    e.target.value ? Number(e.target.value) : undefined
                                  )
                                }
                                placeholder="0"
                                className="w-12 rounded border p-1 text-center"
                                step="0.01"
                                min="0"
                              />
                              <span className="text-gray-500">كيلو/قطعة</span>
                            </div>
                          </div>

                          {/* Total Weight for this item */}
                          {item.weight && (
                            <div className="mt-1 text-xs text-gray-500">
                              الوزن الإجمالي: {((item.weight || 0) * (item.qty || 1)).toFixed(2)}{" "}
                              كيلو
                            </div>
                          )}

                          {/* Note Input */}
                          <input
                            type="text"
                            value={item.note || ""}
                            onChange={(e) => setNote(item.id, e.target.value)}
                            placeholder="ملاحظة..."
                            className="mt-2 w-full rounded border p-1 text-xs"
                          />
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromPack(item.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Travel Essentials Manager Modal */}
      <TravelEssentialsManager
        isOpen={showEssentialsManager}
        onClose={() => setShowEssentialsManager(false)}
      />
    </>
  );
}

// // src/features/pack/components/PackDrawer.tsx
// import { useMemo, useState } from "react";
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
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import {
//   X,
//   Plus,
//   Minus,
//   Copy,
//   Trash2,
//   CheckCircle,
//   AlertCircle,
//   Luggage,
//   Weight,
//   Package,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

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
//     } catch {
//       alert("حدث خطأ في نسخ الحافظة");
//     }
//   };

//   const weightStatus = useMemo(() => {
//     if (allowance == null || Number.isNaN(allowance)) {
//       return { text: "بدون حد وزن", variant: "secondary" as const, icon: Weight };
//     }
//     if ((remainingAllowance ?? 0) >= 0) {
//       return {
//         text: `متبقي ${kg(remainingAllowance)}`,
//         variant: "default" as const,
//         icon: CheckCircle,
//       };
//     }
//     return {
//       text: `زيادة ${kg(Math.abs(remainingAllowance || 0))}`,
//       variant: "destructive" as const,
//       icon: AlertCircle,
//     };
//   }, [allowance, remainingAllowance]);

//   const StatusIcon = weightStatus.icon;

//   return (
//     <Sheet open={open} onOpenChange={onClose}>
//       <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-lg">
//         <SheetHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="rounded-lg bg-purple-100 p-1.5">
//                 <Luggage className="h-4 w-4 text-purple-600" />
//               </div>
//               <div>
//                 <SheetTitle className="text-lg font-bold">شنطة السفر</SheetTitle>
//               </div>
//             </div>
//             <Button variant="ghost" size="icon" onClick={onClose}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </SheetHeader>

//         {/* Compact Stats Section */}
//         <div className="bg-gray-50/50 px-6 py-3">
//           <div className="mb-3 grid grid-cols-3 gap-3">
//             <div className="text-center">
//               <div className="text-lg font-bold">{items.length}</div>
//               <div className="text-xs text-muted-foreground">عنصر</div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold">{totalQty}</div>
//               <div className="text-xs text-muted-foreground">إجمالي</div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold">{kg(totalWeight)}</div>
//               <div className="text-xs text-muted-foreground">الوزن</div>
//             </div>
//           </div>

//           {/* Compact Weight Allowance */}
//           <div className="mb-2 flex items-center gap-2">
//             <Input
//               type="number"
//               step="0.1"
//               min={0}
//               value={allowance ?? ""}
//               onChange={(e) =>
//                 setAllowance(
//                   e.target.value === "" ? undefined : Math.max(0, parseFloat(e.target.value) || 0)
//                 )
//               }
//               className="h-8 flex-1 text-sm"
//               placeholder="حد الطيران (كجم)"
//             />
//             <Badge
//               variant={weightStatus.variant}
//               className="flex items-center gap-1 whitespace-nowrap px-2 py-1 text-xs"
//             >
//               <StatusIcon className="h-3 w-3" />
//               {weightStatus.text}
//             </Badge>
//           </div>
//         </div>

//         <Separator />

//         {/* Scrollable Items */}
//         <ScrollArea className="flex-1 px-6">
//           {!items.length ? (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="mb-4 rounded-full bg-gray-100 p-4">
//                 <Luggage className="h-8 w-8 text-gray-400" />
//               </div>
//               <h3 className="mb-2 text-lg font-medium text-gray-900">شنطتك فارغة</h3>
//               <p className="text-muted-foreground">أضِف عناصر من الدولاب لتبدأ التعبئة</p>
//             </div>
//           ) : (
//             <div className="space-y-6 py-4">
//               {[...grouped.entries()].map(([catId, arr]) => (
//                 <div key={catId}>
//                   <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
//                     <div className="h-6 w-1 rounded-full bg-purple-500"></div>
//                     {categoryNameOf ? categoryNameOf(catId) : catId}
//                     <Badge variant="secondary" className="ml-auto">
//                       {arr.length}
//                     </Badge>
//                   </h3>

//                   <div className="space-y-3">
//                     {arr.map((item) => (
//                       <Card
//                         key={item.id}
//                         className="overflow-hidden transition-shadow hover:shadow-md"
//                       >
//                         <CardContent className="p-4">
//                           <div className="flex gap-4">
//                             {/* Item Image */}
//                             <div className="flex-shrink-0">
//                               {item.thumbnail ? (
//                                 <img
//                                   src={item.thumbnail}
//                                   alt=""
//                                   className="h-16 w-16 rounded-lg border object-cover"
//                                 />
//                               ) : (
//                                 <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
//                                   <Package className="h-6 w-6 text-gray-400" />
//                                 </div>
//                               )}
//                             </div>

//                             {/* Item Details */}
//                             <div className="min-w-0 flex-1">
//                               <div className="mb-2 flex items-start justify-between gap-2">
//                                 <h4 className="truncate font-medium text-gray-900">{item.name}</h4>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => removeFromPack(item.id)}
//                                   className="text-red-500 hover:bg-red-50 hover:text-red-600"
//                                 >
//                                   <Trash2 className="h-4 w-4" />
//                                 </Button>
//                               </div>

//                               {/* Weight Info */}
//                               <div className="mb-2 text-xs text-muted-foreground">
//                                 <span>{kg(item.weight)}</span>
//                                 {typeof item.weight === "number" && (
//                                   <span className="ml-2">
//                                     • إجمالي: {kg((item.weight || 0) * (item.qty || 0))}
//                                   </span>
//                                 )}
//                               </div>

//                               {/* Quantity Controls */}
//                               <div className="flex items-center gap-3">
//                                 <div className="flex items-center overflow-hidden rounded-lg border">
//                                   <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() =>
//                                       setQty(item.id, Math.max(0, (item.qty || 0) - 1))
//                                     }
//                                     className="h-8 rounded-none px-3"
//                                   >
//                                     <Minus className="h-3 w-3" />
//                                   </Button>
//                                   <div className="min-w-[40px] border-x px-4 py-1 text-center text-sm font-medium">
//                                     {item.qty}
//                                   </div>
//                                   <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => setQty(item.id, (item.qty || 0) + 1)}
//                                     className="h-8 rounded-none px-3"
//                                   >
//                                     <Plus className="h-3 w-3" />
//                                   </Button>
//                                 </div>

//                                 <Input
//                                   value={item.note || ""}
//                                   onChange={(e) => setNote(item.id, e.target.value)}
//                                   placeholder="ملاحظة (اختياري)"
//                                   className="h-8 flex-1"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </ScrollArea>

//         {/* Footer Actions */}
//         <div className="space-y-3 border-t bg-white p-4">
//           <TemplateBar
//             onSave={(name, season) => saveTemplate(name, season)}
//             templates={templates}
//             onLoad={(id) => loadTemplate(id)}
//             onDelete={(id) => deleteTemplate(id)}
//           />

//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleCopy}
//               className="flex-1"
//               disabled={!items.length}
//             >
//               <Copy className="mr-2 h-4 w-4" />
//               {copied ? "تم النسخ" : "نسخ"}
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={clearPack}
//               className="flex-1"
//               disabled={!items.length}
//             >
//               <Trash2 className="mr-2 h-4 w-4" />
//               تفريغ
//             </Button>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

// export default PackDrawer;

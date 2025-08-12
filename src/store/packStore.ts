import { ClosetItemMinimal, Pack, PackItem, PackTemplate } from "@/features/pack/types";
import { nowISO, uid } from "@/features/pack/utils";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type LastAdded = {
  id: string;
  name: string;
  thumbnail?: string;
  at: string;
};

export type PackState = {
  pack: Pack;
  templates: PackTemplate[];
  lastAdded?: LastAdded;

  // (نحتفظ بالـ getters، لكن سنستخدم selectors خارجياً)
  itemCount: number; // distinct items
  totalQty: number; // sum of qty
  totalWeight: number; // sum of weights (item weight * qty)
  totalWithBagWeight: number; // totalWeight + bagWeight
  remainingAllowance?: number; // allowance - totalWithBagWeight (if allowance set)

  // actions
  addToPack: (item: ClosetItemMinimal, qty?: number, note?: string) => void;
  removeFromPack: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  setNote: (itemId: string, note: string) => void;
  clearPack: () => void;

  setBagWeight: (w: number) => void;
  setAllowance: (w?: number) => void;
  setItemWeight: (itemId: string, w?: number) => void;

  saveTemplate: (name: string, season?: Pack["season"]) => void;
  loadTemplate: (id: string) => void;
  deleteTemplate: (id: string) => void;

  exportAsText: (categoryNameOf?: (id?: string) => string) => string;

  clearLastAdded: () => void;
};

export const usePackStore = create<PackState>()(
  persist(
    (set, get) => ({
      pack: {
        id: uid(),
        name: "Current Pack",
        items: [],
        createdAt: nowISO(),
        updatedAt: nowISO(),
        bagWeight: 0, // kg
        allowance: undefined, // kg
      },
      templates: [],
      lastAdded: undefined,

      // --- getters (سنستخدم selectors بدلاً منها في UI) ---
      get itemCount() {
        return get().pack.items.length;
      },
      get totalQty() {
        return get().pack.items.reduce((s, i) => s + (i.qty || 0), 0);
      },
      get totalWeight() {
        return get().pack.items.reduce((sum, i) => {
          const per = i.weight ?? 0;
          const qty = i.qty ?? 0;
          return sum + per * qty;
        }, 0);
      },
      get totalWithBagWeight() {
        return (get().pack.bagWeight ?? 0) + get().totalWeight;
      },
      get remainingAllowance() {
        const allowance = get().pack.allowance;
        if (allowance == null) return undefined;
        return allowance - get().totalWithBagWeight;
      },

      // --- actions ---
      addToPack: (item, qty = 1, note) =>
        set((state) => {
          const exists = state.pack.items.find((i) => i.id === item.id);
          const items = exists
            ? state.pack.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      qty: (i.qty || 0) + qty,
                      // لو الوزن جالك جديد من الـ ClosetItemMinimal خليه يحدّث المخزّن
                      weight: item.weight ?? i.weight,
                    }
                  : i
              )
            : [
                ...state.pack.items,
                {
                  id: item.id,
                  name: item.name,
                  categoryId: item.categoryId,
                  thumbnail: item.thumbnail,
                  note,
                  qty,
                  weight: item.weight, // kg per piece
                } as PackItem,
              ];

          const at = nowISO();

          return {
            ...state,
            pack: { ...state.pack, items, updatedAt: at },
            lastAdded: {
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
              at,
            },
          };
        }),

      removeFromPack: (itemId) =>
        set((state) => ({
          ...state,
          pack: {
            ...state.pack,
            items: state.pack.items.filter((i) => i.id !== itemId),
            updatedAt: nowISO(),
          },
        })),

      setQty: (itemId, qty) =>
        set((state) => ({
          ...state,
          pack: {
            ...state.pack,
            items: state.pack.items.map((i) =>
              i.id === itemId ? { ...i, qty: Math.max(0, qty) } : i
            ),
            updatedAt: nowISO(),
          },
        })),

      setNote: (itemId, note) =>
        set((state) => ({
          ...state,
          pack: {
            ...state.pack,
            items: state.pack.items.map((i) => (i.id === itemId ? { ...i, note } : i)),
            updatedAt: nowISO(),
          },
        })),

      setItemWeight: (itemId, w) =>
        set((state) => ({
          ...state,
          pack: {
            ...state.pack,
            items: state.pack.items.map((i) => (i.id === itemId ? { ...i, weight: w } : i)),
            updatedAt: nowISO(),
          },
        })),

      clearPack: () =>
        set((state) => ({
          ...state,
          pack: { ...state.pack, items: [], updatedAt: nowISO() },
        })),

      setBagWeight: (w) =>
        set((state) => ({
          ...state,
          pack: { ...state.pack, bagWeight: Math.max(0, w), updatedAt: nowISO() },
        })),

      setAllowance: (w) =>
        set((state) => ({
          ...state,
          pack: { ...state.pack, allowance: w, updatedAt: nowISO() },
        })),

      saveTemplate: (name, season) =>
        set((state) => ({
          ...state,
          templates: [
            {
              id: uid(),
              name,
              season,
              items: state.pack.items.map((i) => ({ ...i })),
              createdAt: nowISO(),
            },
            ...state.templates,
          ],
        })),

      loadTemplate: (id) =>
        set((state) => {
          const tpl = state.templates.find((t) => t.id === id);
          if (!tpl) return state;
          return {
            ...state,
            pack: {
              ...state.pack,
              items: tpl.items.map((i) => ({ ...i })),
              updatedAt: nowISO(),
            },
          };
        }),

      deleteTemplate: (id) =>
        set((state) => ({
          ...state,
          templates: state.templates.filter((t) => t.id !== id),
        })),

      exportAsText: (categoryNameOf) => {
        const { items, bagWeight, allowance } = get().pack;
        if (!items.length) return "(قائمة الشنطة فارغة)";

        const byCat = new Map<string, PackItem[]>();
        for (const it of items) {
          const k = it.categoryId || "__uncat";
          const arr = byCat.get(k) || [];
          arr.push(it);
          byCat.set(k, arr);
        }
        const lines: string[] = [];
        for (const [catId, arr] of byCat.entries()) {
          const title = categoryNameOf ? categoryNameOf(catId) : catId;
          lines.push(`• ${title}`);
          for (const i of arr) {
            const note = i.note ? ` — (${i.note})` : "";
            const w = i.weight != null ? `, ${i.weight}kg/pc` : "";
            lines.push(`  - ${i.name} × ${i.qty}${w}${note}`);
          }
        }
        lines.push("");
        lines.push(`إجمالي وزن العناصر: ${get().totalWeight.toFixed(2)} kg`);
        if (bagWeight != null) lines.push(`وزن الشنطة: ${Number(bagWeight).toFixed(2)} kg`);
        lines.push(`الإجمالي مع الشنطة: ${get().totalWithBagWeight.toFixed(2)} kg`);
        if (allowance != null) {
          const rem = (get().remainingAllowance ?? 0).toFixed(2);
          lines.push(`المتبقي من الحد: ${rem} kg`);
        }
        return lines.join("\n");
      },

      clearLastAdded: () => set({ lastAdded: undefined }),
    }),
    {
      name: "closet.pack.zustand",
      storage: createJSONStorage(() => localStorage),
      version: 3,
      partialize: (state) => ({
        pack: state.pack,
        templates: state.templates,
        lastAdded: state.lastAdded,
      }),
    }
  )
);

// ==========================
// ✅ Selectors (استخدمها في الواجهة)
// ==========================
export const selectItems = (s: PackState) => s.pack.items;

export const selectTotalQty = (s: PackState) =>
  s.pack.items.reduce((sum, i) => sum + (i.qty || 0), 0);

export const selectTotalWeight = (s: PackState) =>
  s.pack.items.reduce((sum, i) => sum + (i.weight ?? 0) * (i.qty ?? 0), 0);

export const selectTotalWithBagWeight = (s: PackState) =>
  (s.pack.bagWeight ?? 0) + selectTotalWeight(s);

export const selectAllowance = (s: PackState) => s.pack.allowance;

export const selectRemainingAllowance = (s: PackState) => {
  const allowance = s.pack.allowance;
  if (allowance == null) return undefined;
  return allowance - ((s.pack.bagWeight ?? 0) + selectTotalWeight(s));
};

// src/features/pack/types.ts
export type PackItem = {
  id: string; // closet item id
  name: string;
  categoryId?: string; // optional, for grouping
  qty: number;
  note?: string;
  thumbnail?: string;
  weight?: number;
};

export type Pack = {
  id: string;
  name: string; // e.g., "Current Pack"
  items: PackItem[];
  season?: "summer" | "winter" | "spring" | "autumn" | "any";
  createdAt: string;
  updatedAt: string;
  bagWeight?: number; // وزن الشنطة الفارغ (اختياري)
  allowance?: number; // حد الوزن لشركة الطيران (اختياري)
};

export type PackTemplate = {
  id: string;
  name: string; // e.g., "Summer — Beach"
  season?: Pack["season"];
  items: PackItem[]; // includes qty & note
  createdAt: string;
};

// Minimal item shape needed to add to the Pack
export type ClosetItemMinimal = {
  id: string;
  name: string;
  categoryId?: string;
  thumbnail?: string;
  weight?: number;
};

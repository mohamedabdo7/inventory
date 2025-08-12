// store/travelEssentialsStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  TravelEssential,
  TravelEssentialsTemplate,
  TravelEssentialsState,
  MissingEssential,
  Season,
  TripType,
  DEFAULT_TRAVEL_ESSENTIALS,
  DEFAULT_TEMPLATES,
} from "../features/categories/travelEssentials";
import { uid, nowISO } from "@/features/pack/utils";

export const useTravelEssentialsStore = create<TravelEssentialsState>()(
  persist(
    (set, get) => ({
      essentials: DEFAULT_TRAVEL_ESSENTIALS,
      templates: DEFAULT_TEMPLATES,
      userCustomEssentials: [],

      addEssential: (essential) => {
        const newEssential: TravelEssential = {
          ...essential,
          id: uid(),
        };

        set((state) => ({
          userCustomEssentials: [...state.userCustomEssentials, newEssential],
        }));
      },

      updateEssential: (id, updates) => {
        set((state) => ({
          userCustomEssentials: state.userCustomEssentials.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
          essentials: state.essentials.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        }));
      },

      removeEssential: (id) => {
        set((state) => ({
          userCustomEssentials: state.userCustomEssentials.filter((e) => e.id !== id),
        }));
      },

      addTemplate: (template) => {
        const newTemplate: TravelEssentialsTemplate = {
          ...template,
          id: uid(),
          createdAt: nowISO(),
        };

        set((state) => ({
          templates: [newTemplate, ...state.templates],
        }));
      },

      loadTemplate: (templateId) => {
        const state = get();
        const template = state.templates.find((t) => t.id === templateId);
        if (!template) return;

        // يمكن إضافة منطق لتحميل القالب هنا
        // مثلاً إضافة العناصر للشنطة مباشرة
      },

      removeTemplate: (templateId) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== templateId && !t.isDefault),
        }));
      },

      checkMissingEssentials: (packItems, season, tripType) => {
        const state = get();
        const allEssentials = [...state.essentials, ...state.userCustomEssentials];

        // فلترة الأساسيات حسب الموسم ونوع الرحلة
        const relevantEssentials = allEssentials.filter((essential) => {
          const seasonMatch =
            !season || essential.seasons?.includes("all") || essential.seasons?.includes(season);

          const tripMatch =
            !tripType ||
            essential.tripTypes?.includes("all") ||
            essential.tripTypes?.includes(tripType);

          return seasonMatch && tripMatch;
        });

        const missingEssentials: MissingEssential[] = [];

        for (const essential of relevantEssentials) {
          // تحقق من وجود العنصر في الشنطة
          const foundInPack = packItems.some((item) => {
            // مقارنة بالاسم أو الفئة
            const nameMatch =
              item.name.toLowerCase().includes(essential.name.toLowerCase()) ||
              essential.name.toLowerCase().includes(item.name.toLowerCase());

            const categoryMatch = essential.categoryId && item.categoryId === essential.categoryId;

            return nameMatch || categoryMatch;
          });

          if (!foundInPack) {
            // تحقق من وجود بدائل
            const hasAlternative =
              essential.alternatives?.some((alt) =>
                packItems.some((item) => item.name.toLowerCase().includes(alt.toLowerCase()))
              ) || false;

            let reason = "";
            if (essential.isRequired) {
              reason = "عنصر أساسي مفقود";
            } else {
              reason = "عنصر موصى به مفقود";
            }

            if (essential.priority === "high") {
              reason += " - أولوية عالية";
            }

            missingEssentials.push({
              essential,
              reason,
              hasAlternative,
            });
          }
        }

        // ترتيب حسب الأولوية
        return missingEssentials.sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const aPriority = priorityOrder[a.essential.priority];
          const bPriority = priorityOrder[b.essential.priority];

          if (aPriority !== bPriority) {
            return bPriority - aPriority;
          }

          // الأساسيات المطلوبة أولاً
          if (a.essential.isRequired !== b.essential.isRequired) {
            return a.essential.isRequired ? -1 : 1;
          }

          return 0;
        });
      },
    }),
    {
      name: "travel-essentials-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        templates: state.templates,
        userCustomEssentials: state.userCustomEssentials,
        // لا نحفظ essentials لأنها ثابتة
      }),
    }
  )
);

// Selectors for better performance
export const selectMissingEssentialsCount = (
  state: TravelEssentialsState,
  packItems: any[],
  season?: Season,
  tripType?: TripType
) => {
  return state.checkMissingEssentials(packItems, season, tripType).length;
};

export const selectHighPriorityMissing = (
  state: TravelEssentialsState,
  packItems: any[],
  season?: Season,
  tripType?: TripType
) => {
  return state
    .checkMissingEssentials(packItems, season, tripType)
    .filter((m) => m.essential.priority === "high");
};

export const selectRequiredMissing = (
  state: TravelEssentialsState,
  packItems: any[],
  season?: Season,
  tripType?: TripType
) => {
  return state
    .checkMissingEssentials(packItems, season, tripType)
    .filter((m) => m.essential.isRequired);
};

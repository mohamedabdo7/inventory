// types/travelEssentials.ts
export interface TravelEssential {
  id: string;
  name: string;
  description?: string;
  categoryId?: number; // ربط بالتصنيفات الموجودة
  isRequired: boolean; // إجباري ولا اختياري
  seasons?: Season[]; // في أي المواسم مطلوب
  tripTypes?: TripType[]; // نوع الرحلة
  priority: Priority;
  alternatives?: string[]; // بدائل للعنصر ده
}

export type Season = "summer" | "winter" | "spring" | "fall" | "all";
export type TripType = "business" | "leisure" | "adventure" | "beach" | "city" | "camping" | "all";
export type Priority = "high" | "medium" | "low";

export interface TravelEssentialsTemplate {
  id: string;
  name: string;
  description: string;
  essentials: TravelEssential[];
  createdAt: string;
  isDefault?: boolean;
}

export interface MissingEssential {
  essential: TravelEssential;
  reason: string; // السبب في إنها مفقودة
  hasAlternative?: boolean; // لو فيه بديل في الشنطة
}

export interface TravelEssentialsState {
  essentials: TravelEssential[];
  templates: TravelEssentialsTemplate[];
  userCustomEssentials: TravelEssential[];

  // Actions
  addEssential: (essential: Omit<TravelEssential, "id">) => void;
  updateEssential: (id: string, updates: Partial<TravelEssential>) => void;
  removeEssential: (id: string) => void;

  addTemplate: (template: Omit<TravelEssentialsTemplate, "id" | "createdAt">) => void;
  loadTemplate: (templateId: string) => void;
  removeTemplate: (templateId: string) => void;

  checkMissingEssentials: (
    packItems: any[],
    season?: Season,
    tripType?: TripType
  ) => MissingEssential[];
}

// Default essentials data
export const DEFAULT_TRAVEL_ESSENTIALS: TravelEssential[] = [
  // الأساسيات العامة
  {
    id: "passport",
    name: "جواز السفر",
    description: "وثيقة السفر الأساسية",
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "high",
  },
  {
    id: "id_card",
    name: "البطاقة الشخصية",
    description: "للهوية المحلية",
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "high",
  },
  {
    id: "wallet",
    name: "المحفظة",
    description: "للأموال والبطاقات",
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "high",
  },
  {
    id: "phone_charger",
    name: "شاحن الهاتف",
    description: "لشحن الهاتف أثناء السفر",
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "high",
  },

  // ملابس أساسية
  {
    id: "underwear",
    name: "ملابس داخلية",
    description: "ملابس داخلية حسب عدد الأيام",
    categoryId: 1, // افتراض إن ده category الملابس
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "high",
  },
  {
    id: "socks",
    name: "جوارب",
    description: "جوارب حسب عدد الأيام",
    categoryId: 1,
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "high",
  },

  // أدوات النظافة
  {
    id: "toothbrush",
    name: "فرشة الأسنان",
    description: "للنظافة الشخصية",
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "high",
  },
  {
    id: "toothpaste",
    name: "معجون الأسنان",
    description: "للنظافة الشخصية",
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "high",
  },
  {
    id: "shampoo",
    name: "شامبو",
    description: "لغسل الشعر",
    isRequired: false,
    seasons: ["all"],
    tripTypes: ["leisure", "adventure", "beach", "camping"],
    priority: "medium",
  },

  // ملابس موسمية
  {
    id: "jacket",
    name: "جاكيت",
    description: "للطقس البارد",
    categoryId: 1,
    isRequired: true,
    seasons: ["winter", "fall"],
    tripTypes: ["all"],
    priority: "high",
  },
  {
    id: "sunscreen",
    name: "واقي الشمس",
    description: "للحماية من أشعة الشمس",
    isRequired: true,
    seasons: ["summer"],
    tripTypes: ["beach", "adventure", "leisure"],
    priority: "high",
  },
  {
    id: "swimwear",
    name: "ملابس السباحة",
    description: "للشاطئ والمسابح",
    categoryId: 1,
    isRequired: true,
    seasons: ["summer"],
    tripTypes: ["beach"],
    priority: "high",
  },

  // أدوات العمل
  {
    id: "laptop",
    name: "لابتوب",
    description: "للعمل والمهام",
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["business"],
    priority: "high",
  },
  {
    id: "business_clothes",
    name: "ملابس رسمية",
    description: "للاجتماعات والعمل",
    categoryId: 1,
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["business"],
    priority: "high",
  },

  // أدوات المغامرات
  {
    id: "hiking_boots",
    name: "حذاء المشي",
    description: "للمشي والتسلق",
    categoryId: 3, // افتراض إن ده category الأحذية
    isRequired: true,
    seasons: ["all"],
    tripTypes: ["adventure", "camping"],
    priority: "high",
  },
  {
    id: "first_aid_kit",
    name: "حقيبة إسعافات أولية",
    description: "للطوارئ البسيطة",
    isRequired: false,
    seasons: ["all"],
    tripTypes: ["adventure", "camping"],
    priority: "medium",
  },
];

// Default templates
export const DEFAULT_TEMPLATES: TravelEssentialsTemplate[] = [
  {
    id: "business_trip",
    name: "رحلة عمل",
    description: "الأساسيات لرحلة عمل قصيرة",
    essentials: DEFAULT_TRAVEL_ESSENTIALS.filter(
      (e) => e.tripTypes?.includes("business") || e.tripTypes?.includes("all")
    ),
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
  {
    id: "beach_vacation",
    name: "إجازة شاطئ",
    description: "الأساسيات لإجازة على الشاطئ",
    essentials: DEFAULT_TRAVEL_ESSENTIALS.filter(
      (e) => e.tripTypes?.includes("beach") || e.tripTypes?.includes("all")
    ),
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
  {
    id: "city_break",
    name: "جولة في المدينة",
    description: "الأساسيات لجولة في المدن",
    essentials: DEFAULT_TRAVEL_ESSENTIALS.filter(
      (e) => e.tripTypes?.includes("city") || e.tripTypes?.includes("all")
    ),
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
];

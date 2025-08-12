// components/TravelEssentialsManager.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Download,
  Upload,
  Star,
  CheckCircle,
} from "lucide-react";
import { useTravelEssentialsStore } from "@/store/travelEssentialsStore";
import {
  TravelEssential,
  TravelEssentialsTemplate,
  Season,
  TripType,
  Priority,
} from "../../categories/travelEssentials";

interface TravelEssentialsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TravelEssentialsManager: React.FC<TravelEssentialsManagerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"essentials" | "templates">("essentials");
  const [isAddingEssential, setIsAddingEssential] = useState(false);
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [editingEssential, setEditingEssential] = useState<string | null>(null);

  const {
    essentials,
    templates,
    userCustomEssentials,
    addEssential,
    updateEssential,
    removeEssential,
    addTemplate,
    removeTemplate,
  } = useTravelEssentialsStore();

  const [essentialForm, setEssentialForm] = useState<Omit<TravelEssential, "id">>({
    name: "",
    description: "",
    categoryId: undefined,
    isRequired: false,
    seasons: ["all"],
    tripTypes: ["all"],
    priority: "medium",
    alternatives: [],
  });

  const [templateForm, setTemplateForm] = useState({
    name: "",
    description: "",
    selectedEssentials: [] as string[],
  });

  const allEssentials = [...essentials, ...userCustomEssentials];

  if (!isOpen) return null;

  const handleSaveEssential = () => {
    if (essentialForm.name.trim()) {
      if (editingEssential) {
        updateEssential(editingEssential, essentialForm);
        setEditingEssential(null);
      } else {
        addEssential(essentialForm);
      }

      setEssentialForm({
        name: "",
        description: "",
        categoryId: undefined,
        isRequired: false,
        seasons: ["all"],
        tripTypes: ["all"],
        priority: "medium",
        alternatives: [],
      });
      setIsAddingEssential(false);
    }
  };

  const handleEditEssential = (essential: TravelEssential) => {
    setEssentialForm(essential);
    setEditingEssential(essential.id);
    setIsAddingEssential(true);
  };

  const handleSaveTemplate = () => {
    if (templateForm.name.trim() && templateForm.selectedEssentials.length > 0) {
      const selectedEssentialObjects = allEssentials.filter((e) =>
        templateForm.selectedEssentials.includes(e.id)
      );

      addTemplate({
        name: templateForm.name,
        description: templateForm.description,
        essentials: selectedEssentialObjects,
      });

      setTemplateForm({
        name: "",
        description: "",
        selectedEssentials: [],
      });
      setIsAddingTemplate(false);
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-amber-600 bg-amber-50";
      case "low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityText = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "عالية";
      case "medium":
        return "متوسطة";
      case "low":
        return "منخفضة";
      default:
        return "غير محدد";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold">إدارة أساسيات السفر</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "essentials"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("essentials")}
          >
            الأساسيات ({allEssentials.length})
          </button>
          <button
            className={`flex-1 border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "templates"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("templates")}
          >
            القوالب ({templates.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "essentials" && (
            <div className="space-y-4">
              {/* Add Essential Button */}
              <Button
                onClick={() => {
                  setIsAddingEssential(true);
                  setEditingEssential(null);
                }}
                className="mb-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                إضافة أساسي جديد
              </Button>

              {/* Add/Edit Essential Form */}
              {isAddingEssential && (
                <div className="mb-6 space-y-4 rounded-lg bg-gray-50 p-4">
                  <h3 className="font-semibold">
                    {editingEssential ? "تعديل الأساسي" : "إضافة أساسي جديد"}
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">الاسم *</label>
                      <input
                        type="text"
                        value={essentialForm.name}
                        onChange={(e) =>
                          setEssentialForm({ ...essentialForm, name: e.target.value })
                        }
                        className="w-full rounded-md border p-2"
                        placeholder="مثال: جواز السفر"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">الوصف</label>
                      <input
                        type="text"
                        value={essentialForm.description}
                        onChange={(e) =>
                          setEssentialForm({ ...essentialForm, description: e.target.value })
                        }
                        className="w-full rounded-md border p-2"
                        placeholder="وصف مختصر"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">الأولوية</label>
                      <select
                        value={essentialForm.priority}
                        onChange={(e) =>
                          setEssentialForm({
                            ...essentialForm,
                            priority: e.target.value as Priority,
                          })
                        }
                        className="w-full rounded-md border p-2"
                      >
                        <option value="high">عالية</option>
                        <option value="medium">متوسطة</option>
                        <option value="low">منخفضة</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isRequired"
                        checked={essentialForm.isRequired}
                        onChange={(e) =>
                          setEssentialForm({ ...essentialForm, isRequired: e.target.checked })
                        }
                        className="rounded"
                      />
                      <label htmlFor="isRequired" className="text-sm font-medium">
                        عنصر إجباري
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">المواسم</label>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "summer", "winter", "spring", "fall"] as Season[]).map((season) => (
                        <label key={season} className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={essentialForm.seasons?.includes(season)}
                            onChange={(e) => {
                              const seasons = essentialForm.seasons || [];
                              if (e.target.checked) {
                                setEssentialForm({
                                  ...essentialForm,
                                  seasons: [...seasons, season],
                                });
                              } else {
                                setEssentialForm({
                                  ...essentialForm,
                                  seasons: seasons.filter((s) => s !== season),
                                });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">
                            {season === "all"
                              ? "كل المواسم"
                              : season === "summer"
                                ? "صيف"
                                : season === "winter"
                                  ? "شتاء"
                                  : season === "spring"
                                    ? "ربيع"
                                    : "خريف"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">أنواع الرحلات</label>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "all",
                          "business",
                          "leisure",
                          "adventure",
                          "beach",
                          "city",
                          "camping",
                        ] as TripType[]
                      ).map((type) => (
                        <label key={type} className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={essentialForm.tripTypes?.includes(type)}
                            onChange={(e) => {
                              const tripTypes = essentialForm.tripTypes || [];
                              if (e.target.checked) {
                                setEssentialForm({
                                  ...essentialForm,
                                  tripTypes: [...tripTypes, type],
                                });
                              } else {
                                setEssentialForm({
                                  ...essentialForm,
                                  tripTypes: tripTypes.filter((t) => t !== type),
                                });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">
                            {type === "all"
                              ? "كل الأنواع"
                              : type === "business"
                                ? "عمل"
                                : type === "leisure"
                                  ? "ترفيه"
                                  : type === "adventure"
                                    ? "مغامرة"
                                    : type === "beach"
                                      ? "شاطئ"
                                      : type === "city"
                                        ? "مدينة"
                                        : "تخييم"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSaveEssential}>
                      <Save className="mr-2 h-4 w-4" />
                      حفظ
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingEssential(false);
                        setEditingEssential(null);
                      }}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              )}

              {/* Essentials List */}
              <div className="space-y-3">
                {/* Default Essentials */}
                <div>
                  <h4 className="mb-3 font-semibold text-gray-700">الأساسيات الافتراضية</h4>
                  <div className="space-y-2">
                    {essentials.map((essential) => (
                      <EssentialCard
                        key={essential.id}
                        essential={essential}
                        onEdit={handleEditEssential}
                        onDelete={removeEssential}
                        canDelete={false}
                        getPriorityColor={getPriorityColor}
                        getPriorityText={getPriorityText}
                      />
                    ))}
                  </div>
                </div>

                {/* User Custom Essentials */}
                {userCustomEssentials.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-700">الأساسيات المخصصة</h4>
                    <div className="space-y-2">
                      {userCustomEssentials.map((essential) => (
                        <EssentialCard
                          key={essential.id}
                          essential={essential}
                          onEdit={handleEditEssential}
                          onDelete={removeEssential}
                          canDelete={true}
                          getPriorityColor={getPriorityColor}
                          getPriorityText={getPriorityText}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="space-y-4">
              {/* Add Template Button */}
              <Button onClick={() => setIsAddingTemplate(true)} className="mb-4">
                <Plus className="mr-2 h-4 w-4" />
                إنشاء قالب جديد
              </Button>

              {/* Add Template Form */}
              {isAddingTemplate && (
                <div className="mb-6 space-y-4 rounded-lg bg-gray-50 p-4">
                  <h3 className="font-semibold">إنشاء قالب جديد</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">اسم القالب *</label>
                      <input
                        type="text"
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                        className="w-full rounded-md border p-2"
                        placeholder="مثال: رحلة عمل قصيرة"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">الوصف</label>
                      <input
                        type="text"
                        value={templateForm.description}
                        onChange={(e) =>
                          setTemplateForm({ ...templateForm, description: e.target.value })
                        }
                        className="w-full rounded-md border p-2"
                        placeholder="وصف القالب"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">اختر الأساسيات للقالب</label>
                    <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border p-2">
                      {allEssentials.map((essential) => (
                        <label key={essential.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={templateForm.selectedEssentials.includes(essential.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTemplateForm({
                                  ...templateForm,
                                  selectedEssentials: [
                                    ...templateForm.selectedEssentials,
                                    essential.id,
                                  ],
                                });
                              } else {
                                setTemplateForm({
                                  ...templateForm,
                                  selectedEssentials: templateForm.selectedEssentials.filter(
                                    (id) => id !== essential.id
                                  ),
                                });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{essential.name}</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${getPriorityColor(essential.priority)}`}
                          >
                            {getPriorityText(essential.priority)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSaveTemplate}>
                      <Save className="mr-2 h-4 w-4" />
                      حفظ القالب
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingTemplate(false)}>
                      إلغاء
                    </Button>
                  </div>
                </div>
              )}

              {/* Templates List */}
              <div className="space-y-3">
                {templates.map((template) => (
                  <div key={template.id} className="rounded-lg border bg-white p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{template.name}</h4>
                          {template.isDefault && <Star className="h-4 w-4 text-yellow-500" />}
                        </div>
                        {template.description && (
                          <p className="mt-1 text-sm text-gray-600">{template.description}</p>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                          {template.essentials.length} عنصر • تم الإنشاء:{" "}
                          {new Date(template.createdAt).toLocaleDateString("ar")}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="mr-1 h-3 w-3" />
                          تطبيق
                        </Button>
                        {!template.isDefault && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeTemplate(template.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {template.essentials.slice(0, 5).map((essential) => (
                        <span key={essential.id} className="rounded bg-gray-100 px-2 py-1 text-xs">
                          {essential.name}
                        </span>
                      ))}
                      {template.essentials.length > 5 && (
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                          +{template.essentials.length - 5} أخرى
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Essential Card Component
interface EssentialCardProps {
  essential: TravelEssential;
  onEdit: (essential: TravelEssential) => void;
  onDelete: (id: string) => void;
  canDelete: boolean;
  getPriorityColor: (priority: Priority) => string;
  getPriorityText: (priority: Priority) => string;
}

const EssentialCard: React.FC<EssentialCardProps> = ({
  essential,
  onEdit,
  onDelete,
  canDelete,
  getPriorityColor,
  getPriorityText,
}) => {
  return (
    <div className="rounded-lg border bg-white p-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h5 className="font-medium">{essential.name}</h5>
            {essential.isRequired && <CheckCircle className="h-4 w-4 text-green-600" />}
            <span
              className={`rounded-full px-2 py-1 text-xs ${getPriorityColor(essential.priority)}`}
            >
              {getPriorityText(essential.priority)}
            </span>
          </div>
          {essential.description && (
            <p className="mt-1 text-sm text-gray-600">{essential.description}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-1">
            {essential.seasons?.map((season) => (
              <span key={season} className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-600">
                {season === "all"
                  ? "كل المواسم"
                  : season === "summer"
                    ? "صيف"
                    : season === "winter"
                      ? "شتاء"
                      : season === "spring"
                        ? "ربيع"
                        : "خريف"}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={() => onEdit(essential)}>
            <Edit className="h-3 w-3" />
          </Button>
          {canDelete && (
            <Button size="sm" variant="ghost" onClick={() => onDelete(essential.id)}>
              <Trash2 className="h-3 w-3 text-red-500" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelEssentialsManager;

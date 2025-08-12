// components/MissingEssentialsAlert.tsx
import React, { useState, useMemo } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle, Info, CheckCircle, Plus } from "lucide-react";
import { useTravelEssentialsStore } from "@/store/travelEssentialsStore";
import { usePackStore, selectItems } from "@/store/packStore";
import { Season, TripType, MissingEssential } from "../../categories/travelEssentials";

interface MissingEssentialsAlertProps {
  season?: Season;
  tripType?: TripType;
  onAddToPackFromEssentials?: (essentialName: string) => void;
}

export const MissingEssentialsAlert: React.FC<MissingEssentialsAlertProps> = ({
  season,
  tripType,
  onAddToPackFromEssentials,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState(false);

  const checkMissingEssentials = useTravelEssentialsStore((state) => state.checkMissingEssentials);
  const packItems = usePackStore(selectItems);

  const missingEssentials = useMemo(() => {
    return checkMissingEssentials(packItems, season, tripType);
  }, [checkMissingEssentials, packItems, season, tripType]);

  const criticalMissing = missingEssentials.filter(
    (m) => m.essential.isRequired && m.essential.priority === "high"
  );

  const importantMissing = missingEssentials.filter(
    (m) => m.essential.priority === "high" && !m.essential.isRequired
  );

  const recommendedMissing = missingEssentials.filter((m) => m.essential.priority !== "high");

  if (isDismissed || missingEssentials.length === 0) {
    return null;
  }

  const getAlertVariant = () => {
    if (criticalMissing.length > 0) return "destructive";
    if (importantMissing.length > 0) return "warning";
    return "info";
  };

  const getAlertIcon = () => {
    if (criticalMissing.length > 0) return <AlertTriangle className="h-4 w-4" />;
    if (importantMissing.length > 0) return <Info className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const getAlertTitle = () => {
    if (criticalMissing.length > 0) {
      return `⚠️ ${criticalMissing.length} عنصر أساسي مفقود من شنطتك!`;
    }
    if (importantMissing.length > 0) {
      return `💡 ${importantMissing.length} عنصر مهم موصى بإضافته`;
    }
    return `✅ شنطتك جاهزة تقريباً! ${recommendedMissing.length} عنصر اختياري`;
  };

  const handleAddEssential = (essential: MissingEssential) => {
    if (onAddToPackFromEssentials) {
      onAddToPackFromEssentials(essential.essential.name);
    }
  };

  return (
    <div className="space-y-2">
      <Alert
        className={`relative ${
          getAlertVariant() === "destructive"
            ? "border-red-200 bg-red-50"
            : getAlertVariant() === "warning"
              ? "border-amber-200 bg-amber-50"
              : "border-blue-200 bg-blue-50"
        }`}
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-6 w-6 p-0"
          onClick={() => setIsDismissed(true)}
        >
          <X className="h-3 w-3" />
        </Button>

        <div className="flex items-start gap-3 pr-8">
          {getAlertIcon()}
          <div className="flex-1">
            <AlertDescription className="mb-2 font-medium">{getAlertTitle()}</AlertDescription>

            {/* عرض سريع للعناصر المفقودة */}
            {criticalMissing.length > 0 && (
              <div className="mb-2">
                <div className="text-sm font-medium text-red-700">عناصر أساسية:</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {criticalMissing.slice(0, 3).map((missing) => (
                    <span
                      key={missing.essential.id}
                      className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-700"
                    >
                      {missing.essential.name}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 text-red-600 hover:text-red-800"
                        onClick={() => handleAddEssential(missing)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </span>
                  ))}
                  {criticalMissing.length > 3 && (
                    <span className="text-xs text-red-700">+{criticalMissing.length - 3} أخرى</span>
                  )}
                </div>
              </div>
            )}

            {/* أزرار التحكم */}
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setExpandedDetails(!expandedDetails)}
                className="text-xs"
              >
                {expandedDetails ? "إخفاء التفاصيل" : "عرض التفاصيل"}
              </Button>

              {season && (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                  {season === "summer"
                    ? "☀️ صيف"
                    : season === "winter"
                      ? "❄️ شتاء"
                      : season === "spring"
                        ? "🌸 ربيع"
                        : season === "fall"
                          ? "🍂 خريف"
                          : "🌍 كل المواسم"}
                </span>
              )}

              {tripType && (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                  {tripType === "business"
                    ? "💼 عمل"
                    : tripType === "leisure"
                      ? "🏖️ ترفيه"
                      : tripType === "adventure"
                        ? "🏔️ مغامرة"
                        : tripType === "beach"
                          ? "🏖️ شاطئ"
                          : tripType === "city"
                            ? "🏙️ مدينة"
                            : tripType === "camping"
                              ? "⛺ تخييم"
                              : "✈️ عام"}
                </span>
              )}
            </div>
          </div>
        </div>
      </Alert>

      {/* تفاصيل موسعة */}
      {expandedDetails && (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
          {criticalMissing.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-red-700">
                <AlertTriangle className="h-4 w-4" />
                عناصر أساسية مفقودة ({criticalMissing.length})
              </h4>
              <div className="space-y-2">
                {criticalMissing.map((missing) => (
                  <EssentialItem
                    key={missing.essential.id}
                    missing={missing}
                    onAdd={handleAddEssential}
                    variant="critical"
                  />
                ))}
              </div>
            </div>
          )}

          {importantMissing.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-amber-700">
                <Info className="h-4 w-4" />
                عناصر مهمة موصى بها ({importantMissing.length})
              </h4>
              <div className="space-y-2">
                {importantMissing.map((missing) => (
                  <EssentialItem
                    key={missing.essential.id}
                    missing={missing}
                    onAdd={handleAddEssential}
                    variant="important"
                  />
                ))}
              </div>
            </div>
          )}

          {recommendedMissing.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-700">
                <CheckCircle className="h-4 w-4" />
                اقتراحات إضافية ({recommendedMissing.length})
              </h4>
              <div className="space-y-2">
                {recommendedMissing.slice(0, 5).map((missing) => (
                  <EssentialItem
                    key={missing.essential.id}
                    missing={missing}
                    onAdd={handleAddEssential}
                    variant="recommended"
                  />
                ))}
                {recommendedMissing.length > 5 && (
                  <div className="text-center text-sm text-gray-500">
                    +{recommendedMissing.length - 5} اقتراح إضافي
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// مكون فرعي لعرض كل عنصر مفقود
interface EssentialItemProps {
  missing: MissingEssential;
  onAdd: (missing: MissingEssential) => void;
  variant: "critical" | "important" | "recommended";
}

const EssentialItem: React.FC<EssentialItemProps> = ({ missing, onAdd, variant }) => {
  const bgColor = {
    critical: "bg-red-50 border-red-100",
    important: "bg-amber-50 border-amber-100",
    recommended: "bg-blue-50 border-blue-100",
  }[variant];

  const textColor = {
    critical: "text-red-700",
    important: "text-amber-700",
    recommended: "text-blue-700",
  }[variant];

  return (
    <div className={`flex items-center justify-between rounded-lg border p-3 ${bgColor}`}>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${textColor}`}>{missing.essential.name}</span>
          {missing.essential.isRequired && (
            <span className="rounded bg-red-100 px-1 py-0.5 text-xs text-red-600">إجباري</span>
          )}
          {missing.hasAlternative && (
            <span className="rounded bg-green-100 px-1 py-0.5 text-xs text-green-600">له بديل</span>
          )}
        </div>
        {missing.essential.description && (
          <div className="mt-1 text-sm text-gray-600">{missing.essential.description}</div>
        )}
        <div className="mt-1 text-xs text-gray-500">{missing.reason}</div>
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={() => onAdd(missing)}
        className={`ml-2 ${textColor}`}
      >
        <Plus className="mr-1 h-3 w-3" />
        أضف
      </Button>
    </div>
  );
};

export default MissingEssentialsAlert;

// src/features/pack/components/TemplateBar.tsx
import React, { useState } from "react";
import type { Pack, PackTemplate } from "../types";

export function TemplateBar({
  onSave,
  templates,
  onLoad,
  onDelete,
}: {
  onSave: (name: string, season?: Pack["season"]) => void;
  templates: PackTemplate[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [season, setSeason] = useState<Pack["season"] | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم القالب (مثلاً: صيف — شاطئ)"
          className="w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
        />
        <select
          value={season || ""}
          onChange={(e) => setSeason((e.target.value || undefined) as any)}
          className="rounded-lg border px-2 py-1.5 text-sm"
        >
          <option value="">الموسم</option>
          <option value="summer">صيف</option>
          <option value="winter">شتاء</option>
          <option value="spring">ربيع</option>
          <option value="autumn">خريف</option>
          <option value="any">عام</option>
        </select>
        <button
          onClick={() => {
            if (!name.trim()) return;
            onSave(name.trim(), season);
            setName("");
            setSeason(undefined);
          }}
          className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          حفظ كقالب
        </button>
      </div>

      <TemplatePicker templates={templates} onLoad={onLoad} onDelete={onDelete} />
    </div>
  );
}

export function TemplatePicker({
  templates,
  onLoad,
  onDelete,
}: {
  templates: PackTemplate[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        القوالب
      </button>
      {open && (
        <div className="absolute bottom-11 right-0 z-50 w-64 overflow-hidden rounded-xl border bg-white shadow">
          <div className="max-h-72 overflow-y-auto">
            {templates.length === 0 && (
              <div className="p-3 text-sm text-gray-500">لا توجد قوالب محفوظة بعد</div>
            )}
            {templates.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-2 border-b px-3 py-2 text-sm last:border-b-0"
              >
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-gray-500">
                    {t.season || "—"} • {new Date(t.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onLoad(t.id)}
                    className="rounded-md border px-2 py-1 hover:bg-gray-50"
                  >
                    تحميل
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="rounded-md border px-2 py-1 hover:bg-gray-50"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 text-right">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

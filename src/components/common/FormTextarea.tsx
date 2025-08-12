import React from "react";

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      rows={rows}
      placeholder={placeholder}
    />
  </div>
);

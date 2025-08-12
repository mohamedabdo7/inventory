import React from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label} {required && "*"}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder={placeholder}
    />
  </div>
);

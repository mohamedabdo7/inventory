import React from "react";
import { Upload, X } from "lucide-react";
import { handleFileUpload, removeAttachment } from "@/features/categories/utils";

interface FileUploadProps {
  attachments: string[];
  onChange: (attachments: string[]) => void;
  label?: string;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  attachments,
  onChange,
  label = "Photos",
  accept = "image/*",
}) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center gap-4">
      <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
        <Upload size={16} className="mr-2" />
        Upload Photos
        <input
          type="file"
          multiple
          accept={accept}
          onChange={(e) => handleFileUpload(e, attachments, onChange)}
          className="hidden"
        />
      </label>
      <span className="text-sm text-gray-500">{attachments.length} photo(s) selected</span>
    </div>
    {attachments.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2">
        {attachments.map((file, index) => (
          <div key={index} className="flex items-center rounded bg-purple-100 px-2 py-1">
            <span className="text-sm">{file}</span>
            <button
              onClick={() => removeAttachment(index, attachments, onChange)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

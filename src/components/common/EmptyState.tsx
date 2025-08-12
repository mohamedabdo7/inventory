import React from "react";
import { Package } from "lucide-react";

interface EmptyStateProps {
  searchTerm?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, message }) => (
  <div className="py-12 text-center">
    <div className="mb-4 text-gray-400">
      <Package size={48} className="mx-auto" />
    </div>
    <p className="text-gray-500">
      {searchTerm
        ? "No items found matching your search."
        : message || "No items in this category yet. Start building your wardrobe!"}
    </p>
  </div>
);

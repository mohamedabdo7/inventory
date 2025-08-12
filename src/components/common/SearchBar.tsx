import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search by name, brand, or color...",
}) => (
  <div className="relative mb-6">
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
      size={20}
    />
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

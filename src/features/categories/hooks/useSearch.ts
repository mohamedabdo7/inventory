import { useState } from "react";
import { Product } from "../types";

export const useSearch = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { searchTerm, setSearchTerm, filteredProducts };
};

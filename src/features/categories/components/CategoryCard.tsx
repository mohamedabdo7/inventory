import { Category } from "../types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Eye } from "lucide-react";

interface CategoryCardProps {
  data: Category;
  onClick: () => void;
}

function CategoryCard({ data, onClick }: CategoryCardProps) {
  return (
    <Card
      className="cursor-pointer border border-gray-600 bg-gradient-cards-fill p-4 transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Category Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Package className="h-6 w-6 text-primary" />
        </div>

        {/* Category Name */}
        <h3 className="text-center text-lg font-semibold">{data.name}</h3>

        {/* Products Count */}
        <Badge variant="secondary" className="text-sm">
          {data.productsCount || 0} منتج
        </Badge>

        {/* View Button */}
        <div className="flex items-center gap-1 text-sm text-primary">
          <Eye className="h-4 w-4" />
          <span>عرض المنتجات</span>
        </div>
      </div>
    </Card>
  );
}

export default CategoryCard;

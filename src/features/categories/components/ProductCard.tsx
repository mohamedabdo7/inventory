import { Product } from "../types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Package, Weight } from "lucide-react";

interface ProductCardProps {
  data: Product;
  onView: () => void;
  onEdit: () => void;
}

function ProductCard({ data, onView, onEdit }: ProductCardProps) {
  const firstImage = data.attachments.find((att) => att.fileType === "image");

  return (
    <Card className="overflow-hidden border border-gray-600 bg-gradient-cards-fill">
      {/* Product Image */}
      <div className="flex h-32 items-center justify-center bg-gray-100">
        {firstImage ? (
          <img src={firstImage.fileUrl} alt={data.name} className="h-full w-full object-cover" />
        ) : (
          <Package className="h-12 w-12 text-gray-400" />
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold">{data.name}</h3>

        {data.description && (
          <p className="line-clamp-2 text-sm text-gray-600">{data.description}</p>
        )}

        {/* Weight */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Weight className="h-4 w-4" />
          <span>
            {data.weight} {data.weightUnit}
          </span>
        </div>

        {/* Attachments Count */}
        {data.attachments.length > 0 && (
          <Badge variant="outline" className="text-xs">
            {data.attachments.length} مرفق
          </Badge>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1">
            <Eye className="mr-1 h-4 w-4" />
            عرض
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="mr-1 h-4 w-4" />
            تعديل
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;

"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ActiveFilters = ({ filter }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* active categories */}
      {filter.categories.length > 0 &&
        filter.categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="h-7 gap-1 rounded-full border border-purple-900/40 bg-purple-950/40 text-xs text-purple-300 hover:bg-purple-950/60 hover:text-purple-100"
          >
            {category}
            <X className="w-3" />
          </Button>
        ))}
      {/* active prices */}
      {filter.price.length > 0 &&
        filter.price.map((price) => (
          <Button
            key={price}
            variant="ghost"
            className="h-7 gap-1 rounded-full border border-purple-900/40 bg-purple-950/40 text-xs text-purple-300 hover:bg-purple-950/60 hover:text-purple-100"
          >
            {price}
            <X className="w-3" />
          </Button>
        ))}
    </div>
  );
};

export default ActiveFilters;
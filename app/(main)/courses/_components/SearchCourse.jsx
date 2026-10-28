"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchCourse = () => {
  return (
    <div className="relative h-10 max-lg:w-full">
      <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-purple-400" />
      <Input
        type="text"
        placeholder="Search courses..."
        className="border-purple-900/50 bg-[#0f0720] py-2 pl-9 pr-3 text-sm text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchCourse;
import { GraduationCap } from "lucide-react";

 export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
        <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-lg font-bold tracking-tight text-gray-900">
        Learning<span className="text-blue-600">Platform</span>
      </span>
    </div>
  );
};


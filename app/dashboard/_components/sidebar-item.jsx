"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export const SidebarItem = ({ icon: Icon, label, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "group flex items-center gap-x-2 rounded-lg pl-4 text-sm font-medium text-white transition-all hover:bg-purple-950/40 hover:text-purple-100",
        isActive &&
          "bg-purple-600/15 text-purple-300 hover:bg-purple-600/20 hover:text-purple-200"
      )}
    >
      <div className="flex items-center gap-x-2 py-3">
        <Icon
          size={20}
          className={cn(
            "text-purple-400/60 transition-colors group-hover:text-purple-400",
            isActive && "text-purple-400"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-purple-400 opacity-0 transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
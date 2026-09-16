import { Logo } from "@/components/logo";
import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-purple-950 bg-[#0a0512] shadow-lg shadow-black/40">
      <div className="border-b border-purple-950 p-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex w-full flex-col py-2">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
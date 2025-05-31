"use client";

import { cn } from "@/lib/utils";
import DashboardNavContent from "./dashboard-nav-content";

interface DashboardNavProps {
  className?: string;
}

export default function DashboardNav({ className }: DashboardNavProps) {
  return (
    <div className={cn("hidden lg:block border-r bg-card/50 w-[240px] h-[calc(100vh-4rem)]", className)}>
      <div className="h-full py-6 pl-6 pr-4 overflow-auto">
        <DashboardNavContent />
      </div>
    </div>
  );
}
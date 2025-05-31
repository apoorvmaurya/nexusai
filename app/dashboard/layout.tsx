import { Metadata } from "next";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import DashboardHeader from "@/components/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: "Dashboard | FlowAI",
  description: "AI-powered workflow automation platform dashboard",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-8 pt-6 overflow-auto">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
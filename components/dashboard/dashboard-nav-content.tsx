"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  Workflow,
  Zap,
  Settings,
  Users,
  BarChart3,
  HelpCircle,
  Grid3X3,
  PlusCircle,
} from "lucide-react";

interface DashboardNavContentProps {
  mobile?: boolean;
}

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Conversations",
    icon: MessageSquare,
    href: "/conversations",
  },
  {
    title: "Workflows",
    icon: Workflow,
    href: "/workflows",
    badge: "3",
  },
  {
    title: "Integrations",
    icon: Grid3X3,
    href: "/integrations",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Team",
    icon: Users,
    href: "/team",
  },
];

const bottomNavItems = [
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    href: "/support",
  },
];

export default function DashboardNavContent({ mobile = false }: DashboardNavContentProps) {
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="mb-6">
          <h3 className="px-2 text-xs font-medium uppercase text-muted-foreground tracking-wider">
            Workspace
          </h3>
        </div>
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              title={item.title}
              href={item.href}
              icon={item.icon}
              badge={item.badge}
              isActive={pathname === item.href}
              mobile={mobile}
              onHover={(href) => setIsHovering(href)}
              isHovering={isHovering === item.href}
            />
          ))}
        </nav>

        <div className="pt-4">
          <Button className="w-full justify-start gap-2" size="sm">
            <PlusCircle className="h-4 w-4" />
            New Workflow
          </Button>
        </div>

        <div className="mt-12">
          <h3 className="px-2 text-xs font-medium uppercase text-muted-foreground tracking-wider">
            Account
          </h3>
          <nav className="mt-4 flex flex-col gap-1.5">
            {bottomNavItems.map((item) => (
              <NavItem
                key={item.href}
                title={item.title}
                href={item.href}
                icon={item.icon}
                isActive={pathname === item.href}
                mobile={mobile}
                onHover={(href) => setIsHovering(href)}
                isHovering={isHovering === item.href}
              />
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div className="rounded-xl border p-4 bg-card/50">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Pro Plan</h4>
              <p className="text-xs text-muted-foreground">Upgrade for more features</p>
            </div>
          </div>
          <Button className="w-full mt-4" size="sm">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  isActive?: boolean;
  mobile?: boolean;
  onHover: (href: string | null) => void;
  isHovering: boolean;
}

function NavItem({
  title,
  href,
  icon: Icon,
  badge,
  isActive = false,
  mobile = false,
  onHover,
  isHovering,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center rounded-lg px-2 py-1.5 text-sm font-medium",
        "hover:bg-accent hover:text-accent-foreground",
        "transition-colors",
        isActive ? "text-foreground bg-accent/50" : "text-muted-foreground"
      )}
      onMouseEnter={() => onHover(href)}
      onMouseLeave={() => onHover(null)}
    >
      {isActive && !mobile && (
        <motion.div
          layoutId="activeNavItem"
          className="absolute left-0 h-full w-1 rounded-full bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      {isHovering && !isActive && !mobile && (
        <motion.div
          className="absolute left-0 h-full w-1 rounded-full bg-primary/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span>{title}</span>
      </div>
      {badge && (
        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
          {badge}
        </div>
      )}
    </Link>
  );
}
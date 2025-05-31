"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatsProps {
  title: string;
  value: string;
  description: string;
  trend: number;
  trendType: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
}

export default function DashboardStats({
  title,
  value,
  description,
  trend,
  trendType,
  icon,
}: DashboardStatsProps) {
  // Define colors based on trend type
  const trendColors = {
    increase: "text-emerald-500",
    decrease: "text-red-500",
    neutral: "text-muted-foreground",
  };

  const trendIcons = {
    increase: <ArrowUp className="h-3 w-3" />,
    decrease: <ArrowDown className="h-3 w-3" />,
    neutral: <Minus className="h-3 w-3" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="h-7 w-7 rounded-full flex items-center justify-center bg-primary/10">
              {icon}
            </div>
          </div>
          <div className="text-2xl font-bold mt-2">{value}</div>
          <div className="flex items-center mt-1.5 text-xs">
            <span className={`flex items-center gap-0.5 ${trendColors[trendType]}`}>
              {trendIcons[trendType]}
              {trend !== 0 && `${Math.abs(trend)}%`}
            </span>
            <span className="ml-1.5 text-muted-foreground">{description}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
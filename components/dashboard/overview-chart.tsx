"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend
} from "recharts";
import { cn } from "@/lib/utils";

// This would typically come from an API
const data = [
  { date: "Jan 1", workflows: 4, conversations: 12, automations: 24 },
  { date: "Jan 5", workflows: 6, conversations: 18, automations: 42 },
  { date: "Jan 10", workflows: 8, conversations: 24, automations: 50 },
  { date: "Jan 15", workflows: 12, conversations: 36, automations: 80 },
  { date: "Jan 20", workflows: 16, conversations: 40, automations: 100 },
  { date: "Jan 25", workflows: 20, conversations: 48, automations: 120 },
  { date: "Jan 30", workflows: 24, conversations: 60, automations: 150 },
];

const chartColors = {
  workflows: "hsl(var(--chart-1))",
  conversations: "hsl(var(--chart-2))",
  automations: "hsl(var(--chart-3))",
};

export default function OverviewChart() {
  const [activeKeys, setActiveKeys] = useState({
    workflows: true,
    conversations: true,
    automations: true,
  });

  const toggleKey = (key: keyof typeof activeKeys) => {
    setActiveKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="h-[300px] w-full">
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(activeKeys).map(([key, isActive]) => (
          <ChartLegendItem 
            key={key}
            name={key.charAt(0).toUpperCase() + key.slice(1)} 
            color={chartColors[key as keyof typeof chartColors]}
            active={isActive}
            onClick={() => toggleKey(key as keyof typeof chartColors)}
          />
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            {Object.entries(chartColors).map(([key, color]) => (
              <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            labelStyle={{
              fontWeight: "bold",
              color: "hsl(var(--foreground))"
            }}
          />
          
          {activeKeys.workflows && (
            <Area
              type="monotone"
              dataKey="workflows"
              stroke={chartColors.workflows}
              fillOpacity={1}
              fill={`url(#color-workflows)`}
              activeDot={{ r: 8 }}
            />
          )}
          
          {activeKeys.conversations && (
            <Area
              type="monotone"
              dataKey="conversations"
              stroke={chartColors.conversations}
              fillOpacity={1}
              fill={`url(#color-conversations)`}
            />
          )}
          
          {activeKeys.automations && (
            <Area
              type="monotone"
              dataKey="automations"
              stroke={chartColors.automations}
              fillOpacity={1}
              fill={`url(#color-automations)`}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ChartLegendItemProps {
  name: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

const ChartLegendItem = ({ name, color, active, onClick }: ChartLegendItemProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors",
      active 
        ? "bg-background border-input" 
        : "bg-muted/50 text-muted-foreground border-transparent"
    )}
  >
    <span 
      className="h-2.5 w-2.5 rounded-full" 
      style={{ backgroundColor: active ? color : "hsl(var(--muted-foreground))" }}
    />
    {name}
  </motion.button>
);
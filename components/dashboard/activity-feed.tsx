"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Workflow, Bot, Share2, BarChart3, User } from "lucide-react";

type ActivityType =
  | "workflow_created"
  | "conversation_shared"
  | "integration_added"
  | "analytics_exported"
  | "user_invited";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  timestamp: Date;
  user: string;
}

// This would typically come from an API
const activities: Activity[] = [
  {
    id: "1",
    type: "workflow_created",
    title: "Email Sequence Workflow created",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    user: "John Smith",
  },
  {
    id: "2",
    type: "conversation_shared",
    title: "Shared conversation with team",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    user: "John Smith",
  },
  {
    id: "3",
    type: "integration_added",
    title: "Added Slack integration",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    user: "Jane Cooper",
  },
  {
    id: "4",
    type: "analytics_exported",
    title: "Exported workflow analytics report",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    user: "John Smith",
  },
  {
    id: "5",
    type: "user_invited",
    title: "Invited team member",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    user: "Jane Cooper",
  },
];

// Map activity types to icons
const activityIcons: Record<ActivityType, JSX.Element> = {
  workflow_created: <Workflow className="h-4 w-4" />,
  conversation_shared: <Share2 className="h-4 w-4" />,
  integration_added: <Bot className="h-4 w-4" />,
  analytics_exported: <BarChart3 className="h-4 w-4" />,
  user_invited: <User className="h-4 w-4" />,
};

// Map activity types to background colors
const activityColors: Record<ActivityType, string> = {
  workflow_created: "bg-purple-500/10 text-purple-500",
  conversation_shared: "bg-blue-500/10 text-blue-500",
  integration_added: "bg-emerald-500/10 text-emerald-500",
  analytics_exported: "bg-amber-500/10 text-amber-500",
  user_invited: "bg-rose-500/10 text-rose-500",
};

export default function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="flex items-start gap-3 text-sm"
        >
          <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activityColors[activity.type]}`}>
            {activityIcons[activity.type]}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              by {activity.user}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
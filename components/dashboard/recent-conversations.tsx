"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// This would typically come from an API
const conversations = [
  {
    id: "1",
    title: "Marketing Campaign Automation",
    lastMessage: "Let's set up email sequences for the new product launch",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: "conversation",
  },
  {
    id: "2",
    title: "Data Analysis Workflow",
    lastMessage: "Created workflow to process monthly sales reports",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    type: "workflow",
  },
  {
    id: "3",
    title: "Customer Support Triage",
    lastMessage: "Improved the classification of support tickets by priority",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    type: "conversation",
  },
  {
    id: "4",
    title: "Social Media Scheduler",
    lastMessage: "Workflow successfully integrated with Twitter and LinkedIn",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "workflow",
  },
  {
    id: "5",
    title: "Content Calendar Planning",
    lastMessage: "Let's organize the upcoming blog posts by category",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    type: "conversation",
  },
];

export default function RecentConversations() {
  return (
    <div className="space-y-1">
      {conversations.map((conversation, index) => (
        <motion.div
          key={conversation.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <Link href={`/${conversation.type}s/${conversation.id}`}>
            <div className="flex items-start gap-3 rounded-lg p-3 text-sm transition-colors hover:bg-muted/50">
              <div 
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  conversation.type === "conversation" 
                    ? "bg-blue-500/10 text-blue-500" 
                    : "bg-purple-500/10 text-purple-500"
                )}
              >
                {conversation.type === "conversation" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <Workflow className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{conversation.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(conversation.timestamp, { addSuffix: true })}
                  </p>
                </div>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
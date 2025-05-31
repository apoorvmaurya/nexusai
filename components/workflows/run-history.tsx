"use client";

import React, { useState } from "react";
import type { JSX } from "react";
import { motion } from "framer-motion";
import { 
  Check, X, Clock, AlertTriangle, Search,
  ChevronDown, Download, RefreshCw, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";


interface RunHistoryDataItem {
  id: string;
  status: RunStatus;
  startedAt: Date;
  duration: string;
  trigger: string;
  user: string;
  metrics: {
    messagesSent: number;
    tasksProcessed: number;
  };
  error?: string;
  warning?: string;
}

// Mock data for run history
const runHistoryData: RunHistoryDataItem[] = [
  {
    id: "run-1",
    status: "success",
    startedAt: new Date(Date.now() - 1000 * 60 * 30),
    duration: "1m 23s",
    trigger: "manual",
    user: "John Smith",
    metrics: {
      messagesSent: 5,
      tasksProcessed: 12
    }
  },
  {
    id: "run-2",
    status: "success",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    duration: "52s",
    trigger: "scheduled",
    user: "System",
    metrics: {
      messagesSent: 3,
      tasksProcessed: 8
    }
  },
  {
    id: "run-3",
    status: "error",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    duration: "34s",
    trigger: "webhook",
    user: "System",
    error: "API rate limit exceeded",
    metrics: {
      messagesSent: 0,
      tasksProcessed: 2
    }
  },
  {
    id: "run-4",
    status: "success",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    duration: "1m 12s",
    trigger: "scheduled",
    user: "System",
    metrics: {
      messagesSent: 5,
      tasksProcessed: 10
    }
  },
  {
    id: "run-5",
    status: "warning",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    duration: "2m 05s",
    trigger: "manual",
    user: "Jane Cooper",
    warning: "Slow API response detected",
    metrics: {
      messagesSent: 5,
      tasksProcessed: 12
    }
  },
  {
    id: "run-6",
    status: "success",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    duration: "58s",
    trigger: "scheduled",
    user: "System",
    metrics: {
      messagesSent: 4,
      tasksProcessed: 9
    }
  },
  {
    id: "run-7",
    status: "error",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    duration: "23s",
    trigger: "webhook",
    user: "System",
    error: "Integration authentication failed",
    metrics: {
      messagesSent: 0,
      tasksProcessed: 0
    }
  },
  {
    id: "run-8",
    status: "success",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    duration: "1m 45s",
    trigger: "manual",
    user: "John Smith",
    metrics: {
      messagesSent: 6,
      tasksProcessed: 15
    }
  },
];

interface RunHistoryProps {
  workflowId: string;
}

export default function RunHistory({ workflowId }: RunHistoryProps) {
  const [selectedRun, setSelectedRun] = useState<typeof runHistoryData[0] | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Apply filters
  const filteredRuns = runHistoryData.filter(run => {
    const matchesFilter = filter === "all" || run.status === filter;
    const matchesSearch = run.id.includes(searchTerm) || 
                         run.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         run.trigger.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Run History</h2>
            <p className="text-sm text-muted-foreground">
              View past execution history and results
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search run history..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="success">Successful</SelectItem>
              <SelectItem value="error">Failed</SelectItem>
              <SelectItem value="warning">Warnings</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-xl border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 grid grid-cols-12 text-xs font-medium">
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Run ID</div>
            <div className="col-span-2">Started</div>
            <div className="col-span-1">Duration</div>
            <div className="col-span-2">Trigger</div>
            <div className="col-span-2">User</div>
            <div className="col-span-1 text-center">Messages</div>
            <div className="col-span-1"></div>
          </div>
          
          <div className="divide-y">
            {filteredRuns.map((run, index) => (
              <RunHistoryRow 
                key={run.id} 
                run={run} 
                index={index}
                isSelected={selectedRun?.id === run.id}
                onSelect={() => setSelectedRun(run)}
              />
            ))}
          </div>
        </div>
        
        {filteredRuns.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No matching run history found
          </div>
        )}
      </motion.div>
    </div>
  );
}


type RunStatus = "success" | "error" | "warning" | "running";

interface RunHistoryRowProps {
  run: {
    id: string;
    status: RunStatus;
    startedAt: Date;
    duration: string;
    trigger: string;
    user: string;
    metrics: {
      messagesSent: number;
      tasksProcessed: number;
    };
    error?: string;
    warning?: string;
  };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

function RunHistoryRow({ run, index, isSelected, onSelect }: RunHistoryRowProps) {
  const statusIcons: Record<RunStatus, JSX.Element> = {
    success: <Check className="h-4 w-4 text-green-500" />,
    error: <X className="h-4 w-4 text-red-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    running: <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />,
  };
  
  const statusColors: Record<RunStatus, string> = {
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    running: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 * index }}
      onClick={onSelect}
      className={`px-4 py-3 grid grid-cols-12 items-center text-sm hover:bg-muted/50 cursor-pointer ${isSelected ? "bg-muted/70" : ""}`}
    >
      <div className="col-span-1">
        <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${statusColors[run.status]}`}>
          {statusIcons[run.status]}
          <span className="ml-1 capitalize">{run.status}</span>
        </div>
      </div>
      <div className="col-span-2 font-mono text-xs">{run.id}</div>
      <div className="col-span-2 text-muted-foreground">
        {formatDistanceToNow(run.startedAt, { addSuffix: true })}
      </div>
      <div className="col-span-1">{run.duration}</div>
      <div className="col-span-2 capitalize">{run.trigger}</div>
      <div className="col-span-2">{run.user}</div>
      <div className="col-span-1 text-center">{run.metrics.messagesSent}</div>
      <div className="col-span-1 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Download Logs</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Rerun</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, Search, Filter, Grid3X3, List, 
  Workflow, Zap, Clock, MoreHorizontal, Tag 
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";

// Mock data for workflows
const workflows = [
  {
    id: "1",
    name: "Email Sequence Automation",
    description: "Automated email sequence for new product announcements",
    lastRun: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: "active",
    runs: 125,
    integrations: ["Gmail", "Slack"],
    tags: ["Marketing", "Email"],
  },
  {
    id: "2",
    name: "Customer Support Workflow",
    description: "Automated ticket routing and initial responses",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "active",
    runs: 342,
    integrations: ["Slack", "Notion"],
    tags: ["Support", "Automation"],
  },
  {
    id: "3",
    name: "Social Media Publisher",
    description: "Schedule and publish content across social platforms",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    status: "active",
    runs: 89,
    integrations: ["Twitter", "LinkedIn"],
    tags: ["Marketing", "Social"],
  },
  {
    id: "4",
    name: "Data Analysis Pipeline",
    description: "Process monthly sales data and generate reports",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "paused",
    runs: 12,
    integrations: ["Google Sheets", "Notion"],
    tags: ["Analytics", "Reporting"],
  },
  {
    id: "5",
    name: "Lead Qualification",
    description: "Score and route new leads based on criteria",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    status: "draft",
    runs: 0,
    integrations: ["Gmail", "CRM"],
    tags: ["Sales", "Leads"],
  },
  {
    id: "6",
    name: "Project Management",
    description: "Automate task creation and assignment",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    status: "active",
    runs: 67,
    integrations: ["Trello", "Slack"],
    tags: ["Project", "Teamwork"],
  },
];

export default function WorkflowsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Workflows</h1>
        <Link href="/workflows/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Workflow
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workflows..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <div className="flex items-center rounded-md border bg-muted p-1 text-muted-foreground">
            <button
              className={`inline-flex items-center justify-center rounded-sm p-1.5 text-sm ${
                viewMode === "grid" ? "bg-background text-foreground shadow-sm" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </button>
            <button
              className={`inline-flex items-center justify-center rounded-sm p-1.5 text-sm ${
                viewMode === "list" ? "bg-background text-foreground shadow-sm" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Workflows</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow, index) => (
            <WorkflowCard key={workflow.id} workflow={workflow} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 grid grid-cols-12 text-xs font-medium">
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-2 text-center">Runs</div>
            <div className="col-span-2">Last Run</div>
            <div className="col-span-1"></div>
          </div>
          <div className="divide-y">
            {filteredWorkflows.map((workflow, index) => (
              <WorkflowListItem key={workflow.id} workflow={workflow} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface WorkflowCardProps {
  workflow: typeof workflows[0];
  index: number;
}

function WorkflowCard({ workflow, index }: WorkflowCardProps) {
  const statusColors = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    paused: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    draft: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  type StatusKey = keyof typeof statusColors;
  const status = workflow.status as StatusKey;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
    >
      <Link href={`/workflows/${workflow.id}`}>
        <div className="group relative h-full rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Workflow className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${statusColors[status]}`}>
                    {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                  </div>
                </div>
                
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {workflow.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {workflow.description}
                </p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="h-3.5 w-3.5" />
                <span>{workflow.runs} runs</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatDistanceToNow(workflow.lastRun, { addSuffix: true })}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium mb-1.5 flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {workflow.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium mb-1.5">Integrations</p>
                <div className="flex flex-wrap gap-1.5">
                  {workflow.integrations.map(integration => (
                    <Badge key={integration} variant="outline" className="text-xs bg-muted">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface WorkflowListItemProps {
  workflow: typeof workflows[0];
  index: number;
}

function WorkflowListItem({ workflow, index }: WorkflowListItemProps) {
  const statusColors = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    paused: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    draft: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 * index }}
    >
      <Link href={`/workflows/${workflow.id}`}>
        <div className="px-4 py-3 grid grid-cols-12 items-center text-sm hover:bg-muted/50 transition-colors">
          <div className="col-span-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Workflow className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="font-medium">{workflow.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{workflow.description}</p>
            </div>
          </div>
          <div className="col-span-3">
            <div className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${statusColors[workflow.status as keyof typeof statusColors]}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
              {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
            </div>
          </div>
          <div className="col-span-2 text-center">
            {workflow.runs}
          </div>
          <div className="col-span-2 text-xs text-muted-foreground">
            {formatDistanceToNow(workflow.lastRun, { addSuffix: true })}
          </div>
          <div className="col-span-1 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
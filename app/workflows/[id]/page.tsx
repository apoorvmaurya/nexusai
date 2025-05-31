"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Play, Pause, RotateCcw, Save, Edit2, Copy,
  ArrowLeft, Zap, Clock, MessageSquare, Settings,
  ChevronRight, Plus, Grid3X3, Trash2, Github
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import WorkflowCanvas from "@/components/workflows/workflow-canvas";
import WorkflowSettings from "@/components/workflows/workflow-settings";
import RunHistory from "@/components/workflows/run-history";

export default function WorkflowDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [activeTab, setActiveTab] = useState("editor");
  
  // Mock workflow data - in real app, this would be fetched based on the ID
  const workflow = {
    id: id as string,
    name: "Customer Feedback Workflow",
    description: "Processes customer feedback and routes to appropriate teams",
    status: "active",
    lastRun: new Date(Date.now() - 1000 * 60 * 30),
    runsThisMonth: 124,
    createdBy: "John Smith",
    integrations: ["SurveyMonkey", "Slack", "Notion"],
    nodes: [
      { id: "trigger", type: "trigger", position: { x: 100, y: 100 }, data: { name: "SurveyMonkey Form Response" } },
      { id: "process", type: "process", position: { x: 350, y: 100 }, data: { name: "Analyze Sentiment & Category" } },
      { id: "condition", type: "condition", position: { x: 350, y: 250 }, data: { name: "Check Priority" } },
      { id: "action1", type: "action", position: { x: 600, y: 150 }, data: { name: "Send to Urgent Slack Channel" } },
      { id: "action2", type: "action", position: { x: 600, y: 300 }, data: { name: "Add to Notion Database" } },
    ],
    edges: [
      { id: "e1-2", source: "trigger", target: "process" },
      { id: "e2-3", source: "process", target: "condition" },
      { id: "e3-4", source: "condition", target: "action1", label: "High Priority" },
      { id: "e3-5", source: "condition", target: "action2", label: "Low Priority" },
    ],
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] overflow-hidden">
      {/* Workflow header */}
      <div className="flex flex-col gap-6 pb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/workflows")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{workflow.name}</h1>
          <Badge variant="outline" className={`bg-green-500/10 text-green-500 border-green-500/20 ml-2`}>
            Active
          </Badge>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-sm">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span>{workflow.runsThisMonth} runs this month</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Last run 30 minutes ago</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span>Created by {workflow.createdBy}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Run Now
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </Button>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" />
              Active
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="editor" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <div className="border-b">
          <TabsList className="w-full justify-start h-12">
            <TabsTrigger value="editor" className="data-[state=active]:bg-background">
              Workflow Editor
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-background">
              Settings
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-background">
              Run History
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="editor" className="h-full m-0 data-[state=active]:flex flex-col">
            <div className="flex-1 overflow-hidden">
              <WorkflowCanvas workflow={workflow} />
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="h-full m-0 data-[state=active]:flex overflow-auto">
            <WorkflowSettings workflow={workflow} />
          </TabsContent>
          
          <TabsContent value="history" className="h-full m-0 data-[state=active]:flex overflow-auto">
            <RunHistory workflowId={workflow.id} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
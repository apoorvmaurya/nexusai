"use client";

import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, Grid, ZoomIn, ZoomOut, 
  Expand, Bot, Workflow, Webhook, List, Code, Zap
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WorkflowCanvasProps {
  workflow: any;
}

export default function WorkflowCanvas({ workflow }: WorkflowCanvasProps) {
  const [zoom, setZoom] = useState(100);
  const [nodesList, setNodesList] = useState(workflow.nodes);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 150));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };
  
  interface DragStartHandler {
    (nodeType: string): void;
  }

  const handleDragStart: DragStartHandler = (nodeType) => {
    setDraggingNode(nodeType);
  };
  
  const handleDragEnd = () => {
    setDraggingNode(null);
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar - Nodes palette */}
      <div className="w-64 border-r">
        <Tabs defaultValue="nodes">
          <TabsList className="w-full">
            <TabsTrigger value="nodes" className="flex-1">Nodes</TabsTrigger>
            <TabsTrigger value="integrations" className="flex-1">Integrations</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="p-4">
              <TabsContent value="nodes" className="m-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Triggers</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <NodePaletteItem
                        type="trigger"
                        name="Webhook"
                        icon={<Webhook className="h-4 w-4" />}
                        color="blue"
                        onDragStart={() => handleDragStart("trigger")}
                        onDragEnd={handleDragEnd}
                      />
                      <NodePaletteItem
                        type="trigger"
                        name="Schedule"
                        icon={<Clock className="h-4 w-4" />}
                        color="blue"
                        onDragStart={() => handleDragStart("schedule")}
                        onDragEnd={handleDragEnd}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Logic</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <NodePaletteItem
                        type="condition"
                        name="Condition"
                        icon={<Workflow className="h-4 w-4" />}
                        color="amber"
                        onDragStart={() => handleDragStart("condition")}
                        onDragEnd={handleDragEnd}
                      />
                      <NodePaletteItem
                        type="loop"
                        name="Loop"
                        icon={<RotateCcw className="h-4 w-4" />}
                        color="amber"
                        onDragStart={() => handleDragStart("loop")}
                        onDragEnd={handleDragEnd}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Actions</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <NodePaletteItem
                        type="action"
                        name="HTTP Request"
                        icon={<Globe className="h-4 w-4" />}
                        color="purple"
                        onDragStart={() => handleDragStart("http")}
                        onDragEnd={handleDragEnd}
                      />
                      <NodePaletteItem
                        type="action"
                        name="AI Processing"
                        icon={<Bot className="h-4 w-4" />}
                        color="purple"
                        onDragStart={() => handleDragStart("ai")}
                        onDragEnd={handleDragEnd}
                      />
                      <NodePaletteItem
                        type="action"
                        name="Code Execution"
                        icon={<Code className="h-4 w-4" />}
                        color="purple"
                        onDragStart={() => handleDragStart("code")}
                        onDragEnd={handleDragEnd}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="integrations" className="m-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Connected</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <IntegrationItem 
                        name="SurveyMonkey" 
                        icon="S" 
                        color="#00BF6F" 
                        connected={true} 
                      />
                      <IntegrationItem 
                        name="Slack" 
                        icon="S" 
                        color="#4A154B" 
                        connected={true} 
                      />
                      <IntegrationItem 
                        name="Notion" 
                        icon="N" 
                        color="#000000" 
                        connected={true} 
                      />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Integration
                  </Button>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </div>
      
      {/* Main canvas */}
      <div className="flex-1 relative overflow-hidden bg-muted/30 grid place-items-center">
        <div className="absolute inset-x-0 top-0 border-b bg-background/70 backdrop-blur-sm z-10 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-3.5 w-3.5" />
              Add Node
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Grid className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs w-10 text-center">{zoom}%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Expand className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          className="canvas-container" 
          style={{ 
            transform: `scale(${zoom / 100})`,
            width: "100%",
            height: "100%",
          }}
        >
          {/* Canvas background grid (visual only) */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          {/* Sample workflow nodes */}
          <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <WorkflowNodesPreview workflow={workflow} />
          </div>
          
          {/* Drag preview */}
          {draggingNode && (
            <div 
              className="absolute pointer-events-none opacity-70"
              style={{ 
                left: "50%", 
                top: "50%", 
                transform: "translate(-50%, -50%)" 
              }}
            >
              <div className="border rounded-md px-4 py-2 bg-card shadow-md text-sm flex items-center gap-2">
                <Workflow className="h-4 w-4" />
                <span>New {draggingNode} node</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Right panel - Node properties */}
      <div className="w-72 border-l">
        <div className="p-4">
          <h3 className="font-medium mb-4">Node Properties</h3>
          
          <div className="text-sm text-muted-foreground text-center py-12">
            Select a node to edit its properties
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components
type NodePaletteColor = "blue" | "purple" | "amber" | "green";

interface NodePaletteItemProps {
  type: string;
  name: string;
  icon: React.ReactNode;
  color: NodePaletteColor;
  onDragStart: () => void;
  onDragEnd: () => void;
}

function NodePaletteItem({ type, name, icon, color, onDragStart, onDragEnd }: NodePaletteItemProps) {
  const colorMap = {
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/30",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    green: "bg-green-500/10 text-green-500 border-green-500/30",
  };
  
  return (
    <motion.div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md border cursor-grab",
        colorMap[color]
      )}
    >
      <div className="rounded-md bg-background p-1">
        {icon}
      </div>
      <span className="text-sm">{name}</span>
    </motion.div>
  );
}

interface IntegrationItemProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  connected: boolean;
}

function IntegrationItem({ name, icon, color, connected }: IntegrationItemProps) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md border border-border hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-2">
        <div 
          className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <span className="text-sm">{name}</span>
      </div>
      {connected && (
        <Badge variant="outline" className="text-[10px] h-5">Connected</Badge>
      )}
    </div>
  );
}

interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { name: string };
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

interface WorkflowType {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

function WorkflowNodesPreview({ workflow }: { workflow: WorkflowType }) {
  // This would be replaced by a proper workflow canvas in a real application
  // using a library like React Flow or a custom implementation
  
  return (
    <div className="relative w-[800px] h-[400px]">
      {workflow.nodes.map((node) => (
        <div 
          key={node.id}
          className="absolute p-1"
          style={{ 
            left: node.position.x, 
            top: node.position.y,
          }}
        >
          <NodePreview node={node} />
        </div>
      ))}
      
      {workflow.edges.map((edge) => (
        <svg 
          key={edge.id}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        >
          <path 
            d={getEdgePath(
              workflow.nodes.find(n => n.id === edge.source)!.position,
              workflow.nodes.find(n => n.id === edge.target)!.position
            )}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
          {edge.label && (
            <text
              x={(workflow.nodes.find(n => n.id === edge.source)!.position.x + 
                 workflow.nodes.find(n => n.id === edge.target)!.position.x) / 2}
              y={(workflow.nodes.find(n => n.id === edge.source)!.position.y + 
                 workflow.nodes.find(n => n.id === edge.target)!.position.y) / 2 - 10}
              fontSize="12"
              fill="hsl(var(--muted-foreground))"
              textAnchor="middle"
            >
              {edge.label}
            </text>
          )}
        </svg>
      ))}
    </div>
  );
}

function NodePreview({ node }: { node: WorkflowNode }) {
  const typeColors = {
    trigger: "bg-blue-500/10 border-blue-500/30 text-blue-500",
    process: "bg-purple-500/10 border-purple-500/30 text-purple-500",
    condition: "bg-amber-500/10 border-amber-500/30 text-amber-500",
    action: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
  };
  
  const typeIcons = {
    trigger: <Webhook className="h-4 w-4" />,
    process: <Bot className="h-4 w-4" />,
    condition: <Workflow className="h-4 w-4" />,
    action: <Zap className="h-4 w-4" />,
  };
  
  type NodeType = keyof typeof typeColors;

  return (
    <motion.div 
      className={`w-[200px] rounded-lg border p-3 flex flex-col gap-2 bg-card cursor-pointer ${typeColors[node.type as NodeType]}`}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <div className="flex items-center gap-2">
        {typeIcons[node.type as NodeType]}
        <span className="text-xs font-medium">
          {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
        </span>
      </div>
      <p className="text-sm font-medium">{node.data.name}</p>
    </motion.div>
  );
}

// Helper function to generate simple curved path between nodes
interface Position {
  x: number;
  y: number;
}

function getEdgePath(
  sourcePos: Position, 
  targetPos: Position
): string {
  const sourceX = sourcePos.x + 100;  // Add half node width
  const sourceY = sourcePos.y + 30;   // Add half node height
  const targetX = targetPos.x + 100;  // Add half node width
  const targetY = targetPos.y + 30;   // Add half node height
  
  const midX = (sourceX + targetX) / 2;
  
  return `M${sourceX},${sourceY} C${midX},${sourceY} ${midX},${targetY} ${targetX},${targetY}`;
}

// Missing component references
interface ClockProps extends React.SVGProps<SVGSVGElement> {}

function Clock(props: ClockProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function RotateCcw(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}
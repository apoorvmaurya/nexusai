"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Grid3X3, CheckCircle2, Plug, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for integrations
const integrationCategories = [
  "All",
  "Communication",
  "Productivity",
  "Marketing",
  "Analytics",
  "CRM",
  "Development",
];

const integrations = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Send and receive emails, manage drafts and labels",
    category: "Communication",
    icon: "G",
    iconColor: "#EA4335",
    isConnected: true,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send messages, create channels, and manage users",
    category: "Communication",
    icon: "S",
    iconColor: "#4A154B",
    isConnected: true,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Create pages, update databases, and query content",
    category: "Productivity",
    icon: "N",
    iconColor: "#000000",
    isConnected: false,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Create, update and manage calendar events",
    category: "Productivity",
    icon: "C",
    iconColor: "#4285F4",
    isConnected: true,
  },
  {
    id: "twitter",
    name: "Twitter",
    description: "Post tweets, read timeline, and engage with content",
    category: "Marketing",
    icon: "T",
    iconColor: "#1DA1F2",
    isConnected: false,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Manage issues, pull requests, and repositories",
    category: "Development",
    icon: "G",
    iconColor: "#181717",
    isConnected: false,
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Retrieve website analytics and generate reports",
    category: "Analytics",
    icon: "A",
    iconColor: "#E37400",
    isConnected: false,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Manage contacts, deals, and marketing campaigns",
    category: "CRM",
    icon: "H",
    iconColor: "#FF7A59",
    isConnected: false,
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Process payments and manage subscriptions",
    category: "Payment",
    icon: "S",
    iconColor: "#6772E5",
    isConnected: false,
  },
];

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter integrations based on search and category
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || integration.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect FlowAI with your favorite tools and services
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mt-4 mb-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search integrations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Grid3X3 className="mr-2 h-4 w-4" />
          View Connected
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          {integrationCategories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category.toLowerCase()}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <IntegrationCard key={integration.id} integration={integration} index={index} />
        ))}
      </div>
    </div>
  );
}

interface IntegrationCardProps {
  integration: typeof integrations[0];
  index: number;
}

function IntegrationCard({ integration, index }: IntegrationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className="group rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary/50"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
              style={{ backgroundColor: integration.iconColor }}
            >
              {integration.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{integration.name}</h3>
                {integration.isConnected && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Connected
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {integration.category}
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          {integration.description}
        </p>
        
        <div className="flex items-center gap-3">
          {integration.isConnected ? (
            <Button className="flex-1\" variant="outline">
              Manage Connection
            </Button>
          ) : (
            <Button className="flex-1">
              <Plug className="mr-2 h-4 w-4" />
              Connect
            </Button>
          )}
          
          <Button size="icon" variant="outline">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
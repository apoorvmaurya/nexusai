import { Metadata } from "next";
import { 
  ArrowDown, ArrowUp, History, Zap, 
  MessageSquare, Activity, Users, Calendar 
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import DashboardStats from "@/components/dashboard/dashboard-stats";
import RecentConversations from "@/components/dashboard/recent-conversations";
import ActivityFeed from "@/components/dashboard/activity-feed";
import OverviewChart from "@/components/dashboard/overview-chart";

export const metadata: Metadata = {
  title: "Dashboard | FlowAI",
  description: "AI-powered workflow automation platform dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStats 
          title="Total Conversations" 
          value="284" 
          description="vs. last week" 
          trend={12}
          trendType="increase"
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <DashboardStats 
          title="Active Workflows" 
          value="32" 
          description="vs. last week" 
          trend={-3}
          trendType="decrease"
          icon={<Zap className="h-4 w-4" />}
        />
        <DashboardStats 
          title="Automation Runs" 
          value="8,942" 
          description="vs. last week" 
          trend={24}
          trendType="increase"
          icon={<Activity className="h-4 w-4" />}
        />
        <DashboardStats 
          title="Team Members" 
          value="12" 
          description="Active members" 
          trend={0}
          trendType="neutral"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Your workflow activity for the past 30 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OverviewChart />
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Recent Conversations</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  View all
                  <History className="ml-1 h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[290px] pr-4">
                  <RecentConversations />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <Card className="md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="space-y-1">
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>
                    Your scheduled workflows and events.
                  </CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder for upcoming events */}
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Weekly Report Generation</div>
                        <div className="text-sm text-muted-foreground">Today, 3:00 PM</div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Team Sync Automation</div>
                        <div className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  View all
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[220px]">
                  <ActivityFeed />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed metrics and performance analytics for your workflows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Analytics content would be shown here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                View and export reports about your automation workflows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Reports content would be shown here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences and view recent alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Notifications content would be shown here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
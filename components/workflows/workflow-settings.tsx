"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { 
  Save, Info, Trash2, AlertTriangle,
  Clock, BellRing, Bot, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().optional(),
  schedule: z.string(),
  timeoutSeconds: z.string(),
  enableLogging: z.boolean(),
  enableNotifications: z.boolean(),
  errorHandling: z.enum(["ignore", "retry", "alert"]),
  maxRetries: z.string(),
  retryDelay: z.string(),
});

interface WorkflowSettingsProps {
  workflow: any;
}

export default function WorkflowSettings({ workflow }: WorkflowSettingsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workflow.name,
      description: workflow.description,
      schedule: "manual",
      timeoutSeconds: "60",
      enableLogging: true,
      enableNotifications: true,
      errorHandling: "retry",
      maxRetries: "3",
      retryDelay: "5",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-8">
                  {/* General settings */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">General Settings</h2>
                        <p className="text-sm text-muted-foreground">
                          Basic information about your workflow
                        </p>
                      </div>
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                    
                    <div className="mt-6 grid gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Workflow Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter workflow name" {...field} />
                            </FormControl>
                            <FormDescription>
                              A descriptive name for your workflow
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe what this workflow does" {...field} />
                            </FormControl>
                            <FormDescription>
                              Optional description to help team members understand this workflow
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Execution settings */}
                  <div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Execution Settings</h2>
                      <p className="text-sm text-muted-foreground">
                        Configure how and when this workflow runs
                      </p>
                    </div>
                    
                    <div className="grid gap-6 mt-6">
                      <FormField
                        control={form.control}
                        name="schedule"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select schedule" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="manual">Manual Trigger Only</SelectItem>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="custom">Custom Schedule</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              When should this workflow run automatically
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="timeoutSeconds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Execution Timeout</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Maximum execution time in seconds before timeout
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex flex-col gap-6 sm:flex-row">
                        <FormField
                          control={form.control}
                          name="enableLogging"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-lg border p-4 flex-1">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Bot className="h-4 w-4 text-muted-foreground" />
                                  <FormLabel className="font-normal">Enable Detailed Logging</FormLabel>
                                </div>
                                <FormDescription>
                                  Record detailed execution logs for debugging
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="enableNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-lg border p-4 flex-1">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <BellRing className="h-4 w-4 text-muted-foreground" />
                                  <FormLabel className="font-normal">Enable Notifications</FormLabel>
                                </div>
                                <FormDescription>
                                  Receive alerts on workflow failures
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Error handling */}
                  <div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Error Handling</h2>
                      <p className="text-sm text-muted-foreground">
                        Configure how errors are managed
                      </p>
                    </div>
                    
                    <div className="grid gap-6 mt-6">
                      <FormField
                        control={form.control}
                        name="errorHandling"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Error Strategy</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select strategy" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ignore">Ignore Errors</SelectItem>
                                <SelectItem value="retry">Retry on Failure</SelectItem>
                                <SelectItem value="alert">Alert Only</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How to handle errors during workflow execution
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="maxRetries"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Retries</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Maximum retry attempts
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="retryDelay"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Retry Delay (seconds)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Delay between retry attempts
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Danger zone */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
                    
                    <Card className="border-destructive/50">
                      <CardHeader className="text-destructive">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          <CardTitle className="text-base">Delete Workflow</CardTitle>
                        </div>
                        <CardDescription className="text-destructive/80">
                          This action cannot be undone. This will permanently delete this workflow and all of its data.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/10">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Workflow
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this workflow
                                and remove all of its data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
}
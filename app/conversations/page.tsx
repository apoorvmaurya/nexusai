"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Bot, Search, Plus, Filter, Clock, Star, 
  Folder, MoreHorizontal, Trash2, Archive 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

// Mock data for conversations
const conversations = Array(10).fill(null).map((_, i) => ({
  id: `conv-${i + 1}`,
  title: i === 0 ? "New Conversation" : `Conversation ${i + 1}`,
  preview: i === 0 
    ? "Start a new conversation" 
    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  timestamp: new Date(Date.now() - i * 1000 * 60 * 60 * (i + 1)),
  isFavorite: i % 3 === 0,
  category: i % 2 === 0 ? "Personal" : "Work",
}));

export default function ConversationsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  
  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewConversation = () => {
    router.push("/conversations/new");
  };

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col gap-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Conversations</h1>
        <Button onClick={handleNewConversation}>
          <Plus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <div className="grid flex-1 overflow-hidden grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar */}
        <div className="flex flex-col rounded-xl border bg-card overflow-hidden">
          <div className="flex items-center gap-2 p-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button size="icon" variant="ghost">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="recent">
            <TabsList className="w-full justify-start px-4 h-10 bg-transparent">
              <TabsTrigger value="recent" className="text-xs">Recent</TabsTrigger>
              <TabsTrigger value="favorites" className="text-xs">Favorites</TabsTrigger>
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            </TabsList>
            
            <div className="px-2 pb-2">
              <Separator className="my-2" />
            </div>
            
            <TabsContent value="recent" className="m-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-0.5 p-2">
                  {filteredConversations.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isSelected={selectedConversation?.id === conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="favorites" className="m-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-0.5 p-2">
                  {filteredConversations
                    .filter(c => c.isFavorite)
                    .map((conversation) => (
                      <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isSelected={selectedConversation?.id === conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                      />
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="all" className="m-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-0.5 p-2">
                  {filteredConversations.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isSelected={selectedConversation?.id === conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main content */}
        <div className="flex flex-col rounded-xl border bg-card overflow-hidden">
          {selectedConversation.id === "conv-1" ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Start a new conversation</h2>
              <p className="text-center text-muted-foreground max-w-md mb-6">
                Ask questions, get information, or create automations. Your AI assistant is ready to help.
              </p>
              <Button onClick={handleNewConversation} size="lg">
                <Plus className="mr-2 h-4 w-4" />
                New Conversation
              </Button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Conversation header */}
              <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="font-medium">{selectedConversation.title}</h2>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(selectedConversation.timestamp, { addSuffix: true })}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      <span className="flex items-center gap-1">
                        <Folder className="h-3 w-3" />
                        {selectedConversation.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Star className="h-4 w-4" fill={selectedConversation.isFavorite ? "currentColor" : "none"} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Folder className="mr-2 h-4 w-4" />
                        Move to folder
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Conversation content */}
              <div className="flex-1 p-4 overflow-auto">
                <div className="max-w-3xl mx-auto">
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm text-center">
                      This conversation was started {formatDistanceToNow(selectedConversation.timestamp, { addSuffix: true })}
                    </p>
                    
                    {/* Sample conversation messages */}
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium">JS</span>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p>{selectedConversation.preview}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded-lg">
                        <p>I can help you with that. Let's break down the requirements and create a step-by-step plan. What are the key goals you want to achieve?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Input area */}
              <div className="border-t p-4">
                <div className="flex gap-2 max-w-3xl mx-auto">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ConversationItemProps {
  conversation: typeof conversations[0];
  isSelected: boolean;
  onClick: () => void;
}

function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 rounded-lg p-3 text-sm cursor-pointer transition-colors ${
        isSelected 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-muted/50"
      }`}
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
        <Bot className="h-5 w-5" />
      </div>
      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <p className={`font-medium truncate ${conversation.id === "conv-1" ? "text-muted-foreground" : ""}`}>
            {conversation.title}
          </p>
          {conversation.isFavorite && (
            <Star className="h-3.5 w-3.5 text-amber-500" fill="currentColor" />
          )}
        </div>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {conversation.preview}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(conversation.timestamp, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
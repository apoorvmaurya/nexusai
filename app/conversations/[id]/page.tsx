"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  Bot, User, Paperclip, Send, ThumbsUp, ThumbsDown,
  Copy, Share, ArrowDown, MoreHorizontal, Clock, Folder
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

// Mock conversation data - in a real app, this would be fetched based on the ID
const messages = [
  {
    id: "1",
    role: "user",
    content: "I need to create a workflow that automatically processes customer feedback from our survey tool and categorizes it by sentiment and topic.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "2",
    role: "assistant",
    content: "I can help you create that workflow. Let's break this down into steps:\n\n1. **Data Collection**: We'll need to set up an integration with your survey tool to collect responses automatically.\n\n2. **Sentiment Analysis**: We can use natural language processing to categorize feedback as positive, negative, or neutral.\n\n3. **Topic Classification**: We'll implement a system to identify common themes or topics in the feedback.\n\n4. **Routing**: Based on sentiment and topic, we can route feedback to appropriate team members.\n\n5. **Reporting**: Finally, we'll create automated reports summarizing the feedback.\n\nWhich survey tool are you using? And do you have any specific topics you'd like to track?",
    timestamp: new Date(Date.now() - 1000 * 60 * 59),
  },
  {
    id: "3",
    role: "user",
    content: "We're using SurveyMonkey. The main topics we want to track are Product Features, User Experience, Customer Support, and Pricing. Can we also integrate this with our Slack channels?",
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
  },
  {
    id: "4",
    role: "assistant",
    content: "Perfect! I'll help you set up this workflow with SurveyMonkey and integrate it with Slack. Here's how we can approach it:\n\n**Step 1: SurveyMonkey Integration**\nWe'll use the SurveyMonkey API to automatically fetch new responses. We'll need to set up a webhook that triggers whenever a new survey response is submitted.\n\n**Step 2: Process and Categorize**\nFor each response, we'll:\n- Analyze sentiment (positive, negative, neutral)\n- Classify into your topics (Product Features, User Experience, Customer Support, Pricing)\n- Extract key data points\n\n**Step 3: Slack Integration**\nWe'll set up channels or threads in Slack for each topic category. When feedback comes in:\n- High-priority or negative feedback can go to a #urgent-feedback channel\n- Topic-specific feedback routes to respective channels\n- Daily summaries can be posted to a general #feedback-summary channel\n\nWould you like me to help you build this workflow in the visual editor? Or would you prefer to see some sample code for the API integrations first?",
    timestamp: new Date(Date.now() - 1000 * 60 * 52),
    feedback: "positive",
  },
];

export default function ConversationPage() {
  const params = useParams();
  const { id } = params;
  
  const [inputValue, setInputValue] = useState("");
  const [conversationMessages, setConversationMessages] = useState(messages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setConversationMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const newAIMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm working on implementing this workflow for you. Let me draft the SurveyMonkey integration first, and then we can connect it with Slack. Would you like to see a preview of how the sentiment analysis will work?",
        timestamp: new Date(),
      };
      
      setConversationMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
};
  
  const handleFeedback = (messageId: string, type: any) => {
    setConversationMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: type } 
          : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-xl border bg-card overflow-hidden">
      {/* Conversation header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h2 className="font-medium">Customer Feedback Workflow</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Conversation started 1 hour ago
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-1">
                <Folder className="h-3 w-3" />
                Workflows
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ArrowDown className="mr-2 h-4 w-4" />
                Export conversation
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Create workflow
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Message area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <p className="text-muted-foreground text-sm text-center">
              This conversation was started about an hour ago
            </p>
            
            {conversationMessages.map((message) => (
              <Message 
                key={message.id} 
                message={message} 
                onFeedback={handleFeedback} 
              />
            ))}
            
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="bg-blue-500/10 p-4 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 rounded-full bg-blue-500/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      <div className="h-2 w-2 rounded-full bg-blue-500/40 animate-bounce" style={{ animationDelay: '600ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <div className="border-t p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[100px] resize-none pr-12 pt-3 pb-12"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
            <div className="absolute left-3 bottom-3">
              <p className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MessageProps {
  message: typeof messages[0];
  onFeedback: (messageId: string, type: 'positive' | 'negative') => void;
}

function Message({ message, onFeedback }: MessageProps) {
  const [showActions, setShowActions] = useState(false);

  const isUser = message.role === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 
        ${isUser 
          ? "bg-muted" 
          : "bg-blue-500/10"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4 text-blue-500" />
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <div className={`p-4 rounded-lg ${
          isUser ? "bg-muted" : "bg-blue-500/10"
        }`}>
          <div className="whitespace-pre-line">
            {message.content}
          </div>
        </div>
        
        {!isUser && (
          <div className={`flex items-center gap-1 mt-1 ml-2 transition-opacity duration-200 ${
            showActions || message.feedback ? "opacity-100" : "opacity-0"
          }`}>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-7 w-7 rounded-full ${message.feedback === 'positive' ? 'text-green-500 bg-green-500/10' : ''}`}
              onClick={() => onFeedback(message.id, 'positive')}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-7 w-7 rounded-full ${message.feedback === 'negative' ? 'text-red-500 bg-red-500/10' : ''}`}
              onClick={() => onFeedback(message.id, 'negative')}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
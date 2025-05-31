"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HeroIllustration = () => {
  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/10">
      <div className="absolute inset-0 flex items-center justify-center">
        <MockInterface />
      </div>
    </div>
  );
};

const MockInterface = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row p-2 md:p-4 gap-2 md:gap-4">
      {/* Sidebar */}
      <motion.div 
        className="w-full md:w-56 h-16 md:h-full rounded-xl bg-card/70 backdrop-blur-sm border border-border/50 p-3 flex md:flex-col items-center md:items-start gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500/80" />
          <div className="h-4 w-20 rounded-md bg-foreground/20" />
        </div>
        <div className="hidden md:flex flex-col w-full gap-2 mt-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-foreground/10 w-full" />
          ))}
        </div>
        <div className="hidden md:block mt-auto">
          <div className="h-10 w-full rounded-lg bg-foreground/10" />
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="flex-1 rounded-xl bg-card/70 backdrop-blur-sm border border-border/50 overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Header */}
        <div className="h-12 border-b border-border/50 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 rounded-md bg-foreground/20" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-foreground/10" />
            <div className="h-8 w-8 rounded-lg bg-foreground/10" />
            <div className="h-8 w-8 rounded-full bg-blue-500/30" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          {/* Workflow canvas */}
          <div className="flex-1 rounded-lg bg-background/50 border border-border/50 p-4 grid grid-cols-2 gap-4">
            <WorkflowNode 
              color="blue" 
              position={{ top: "10%", left: "20%" }} 
              delay={0.6}
            />
            <WorkflowNode 
              color="purple" 
              position={{ top: "30%", left: "50%" }} 
              delay={0.8}
            />
            <WorkflowNode 
              color="green" 
              position={{ top: "60%", left: "70%" }} 
              delay={1.0}
            />
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.path 
                d="M120,50 C160,50 200,100 240,100" 
                stroke="rgba(147, 51, 234, 0.5)" 
                strokeWidth="2" 
                fill="none" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
              <motion.path 
                d="M240,100 C280,100 320,150 360,150" 
                stroke="rgba(147, 51, 234, 0.5)" 
                strokeWidth="2" 
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              />
            </svg>
          </div>

          {/* Chat interface */}
          <div className="h-32 rounded-lg bg-background/50 border border-border/50 p-3 flex flex-col">
            <div className="flex-1 space-y-2">
              <motion.div 
                className="max-w-[80%] p-2 rounded-lg bg-blue-500/20 text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.6 }}
              >
                <div className="h-2 w-32 bg-foreground/20 rounded-full mb-1"></div>
                <div className="h-2 w-40 bg-foreground/20 rounded-full"></div>
              </motion.div>
              
              <motion.div 
                className="max-w-[80%] ml-auto p-2 rounded-lg bg-foreground/10 text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.8 }}
              >
                <div className="h-2 w-24 bg-foreground/20 rounded-full mb-1"></div>
                <div className="h-2 w-36 bg-foreground/20 rounded-full"></div>
              </motion.div>
            </div>
            
            <motion.div 
              className="h-9 rounded-lg bg-background border border-border/50 flex items-center px-3 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 2.0 }}
            >
              <div className="h-2 w-40 bg-foreground/20 rounded-full"></div>
              <div className="ml-auto h-6 w-6 rounded-full bg-blue-500/50"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

type WorkflowNodeProps = {
  color: "blue" | "purple" | "green";
  position: React.CSSProperties;
  delay: number;
};

const WorkflowNode = ({ color, position, delay }: WorkflowNodeProps) => {
  const colorMap = {
    blue: "bg-blue-500/30 border-blue-500/50",
    purple: "bg-purple-500/30 border-purple-500/50",
    green: "bg-emerald-500/30 border-emerald-500/50"
  };

  return (
    <motion.div 
      className={`absolute w-24 h-16 rounded-lg ${colorMap[color]} border p-2 flex flex-col justify-between`}
      style={position}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-foreground/20" />
        <div className="h-2 w-12 bg-foreground/20 rounded-full" />
      </div>
      <div className="h-2 w-full bg-foreground/10 rounded-full" />
    </motion.div>
  );
};

export default HeroIllustration;
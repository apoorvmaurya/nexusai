"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const integrations = [
  { name: "Gmail", color: "#EA4335" },
  { name: "Slack", color: "#4A154B" },
  { name: "Notion", color: "#000000" },
  { name: "Microsoft", color: "#00A4EF" },
  { name: "Google Calendar", color: "#4285F4" },
  { name: "Trello", color: "#0079BF" },
  { name: "GitHub", color: "#181717" },
  { name: "Asana", color: "#FC636B" },
];

const LogoCloud = () => {
  return (
    <motion.div 
      className="rounded-3xl border bg-card/30 backdrop-blur-sm p-8 md:p-12 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-8 text-center">Seamlessly integrates with your favorite tools</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {integrations.map((integration, i) => (
            <IntegrationLogo key={integration.name} name={integration.name} color={integration.color} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <motion.div 
            className="text-sm inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-primary/5 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span>View all integrations</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

type IntegrationLogoProps = {
  name: string;
  color: string;
  index: number;
};

const IntegrationLogo = ({ name, color, index }: IntegrationLogoProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <div 
        className="h-16 w-16 rounded-2xl flex items-center justify-center bg-white dark:bg-card shadow-md mb-3"
        style={{ boxShadow: `0 4px 14px ${color}25` }}
      >
        <div 
          className="h-10 w-10 rounded-lg"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );
};

export default LogoCloud;
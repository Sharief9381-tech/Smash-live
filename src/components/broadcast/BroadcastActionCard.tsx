"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BroadcastActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const BroadcastActionCard = ({ 
  title, description, icon: Icon, buttonText, onClick, variant = 'primary' 
}: BroadcastActionCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={cn(
        "glass-panel p-10 rounded-[3.5rem] border-slate-200 relative overflow-hidden group h-full flex flex-col justify-between",
        variant === 'primary' ? "bg-gradient-to-br from-white to-sky-50" : "bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5f] text-white"
      )}
    >
      <div className="space-y-6">
        <div className={cn(
          "h-20 w-20 rounded-[2rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500",
          variant === 'primary' ? "bg-[#0B1F3A] text-sky-400" : "bg-sky-500 text-white"
        )}>
          <Icon className="h-10 w-10" />
        </div>
        
        <div className="space-y-3">
          <h3 className={cn("text-3xl font-black tracking-tighter italic", variant === 'primary' ? "text-[#0B1F3A]" : "text-white")}>
            {title}
          </h3>
          <p className={cn("text-sm font-medium leading-relaxed", variant === 'primary' ? "text-slate-500" : "text-white/60")}>
            {description}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Button 
          onClick={onClick}
          className={cn(
            "w-full h-16 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl transition-all group-hover:gap-4",
            variant === 'primary' ? "bg-[#0B1F3A] text-white hover:bg-sky-500" : "bg-sky-500 text-white hover:bg-sky-400"
          )}
        >
          {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Decorative background element */}
      <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none group-hover:scale-150 transition-transform duration-1000">
        <Icon className="h-40 w-40" />
      </div>
    </motion.div>
  );
};

export default BroadcastActionCard;
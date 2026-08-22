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
      whileHover={{ y: -5 }}
      className={cn(
        "p-8 rounded-[2.5rem] border border-slate-200 relative overflow-hidden group h-full flex flex-col justify-between shadow-sm",
        variant === 'primary' ? "bg-white" : "bg-[#0B1F3A] text-white"
      )}
    >
      <div className="space-y-6 relative z-10">
        <div className={cn(
          "h-14 w-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300",
          variant === 'primary' ? "bg-[#0B1F3A] text-sky-400" : "bg-sky-500 text-white"
        )}>
          <Icon className="h-7 w-7" />
        </div>
        
        <div className="space-y-2">
          <h3 className={cn("text-2xl font-black tracking-tight uppercase italic", variant === 'primary' ? "text-[#0B1F3A]" : "text-white")}>
            {title}
          </h3>
          <p className={cn("text-xs font-medium leading-relaxed", variant === 'primary' ? "text-slate-500" : "text-white/60")}>
            {description}
          </p>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <Button 
          onClick={onClick}
          className={cn(
            "w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all group-hover:gap-3",
            variant === 'primary' ? "bg-[#0B1F3A] text-white hover:bg-sky-500" : "bg-sky-500 text-white hover:bg-sky-400"
          )}
        >
          {buttonText} <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Decorative background element */}
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <Icon className="h-32 w-32" />
      </div>
    </motion.div>
  );
};

export default BroadcastActionCard;
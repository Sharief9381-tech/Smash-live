import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ title, value, icon: Icon, trend, trendUp }: StatCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-[2rem] border-white/5 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="h-12 w-12" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{title}</span>
        </div>
        
        <div className="flex items-end justify-between">
          <h3 className="text-4xl font-black tracking-tighter">{value}</h3>
          {trend && (
            <span className={cn(
              "text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider",
              trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Flame } from 'lucide-react';

interface Commentary {
  id: string;
  text: string;
  type: 'score' | 'highlight' | 'analysis';
  time: string;
}

interface CommentaryFeedProps {
  events: Commentary[];
}

const CommentaryFeed = ({ events }: CommentaryFeedProps) => {
  return (
    <div className="glass-card p-6 rounded-[2rem] h-[400px] flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary fill-current" />
          AI Match Commentary
        </h3>
        <span className="text-[10px] font-bold text-muted-foreground uppercase">Real-time Analysis</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="group flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-xl bg-secondary/50 flex items-center justify-center text-primary">
                  {event.type === 'score' ? <Target className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
                </div>
                {i !== events.length - 1 && <div className="w-px flex-1 bg-white/5 my-2" />}
              </div>
              <div className="space-y-1 pb-4">
                <span className="text-[10px] font-black text-muted-foreground uppercase">{event.time}</span>
                <p className="text-sm font-medium leading-relaxed group-hover:text-primary transition-colors">
                  {event.text}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommentaryFeed;
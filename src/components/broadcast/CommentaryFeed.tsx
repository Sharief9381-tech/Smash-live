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
    <div className="glass-panel p-6 rounded-[2.5rem] h-[350px] flex flex-col space-y-4 border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-sky-500 fill-current" />
          AI Commentary
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
        <AnimatePresence initial={false}>
          {events && events.length > 0 ? (
            events.map((event, i) => (
              <motion.div 
                key={event.id || i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    {event.type === 'score' ? <Target className="h-3.5 w-3.5" /> : <Flame className="h-3.5 w-3.5" />}
                  </div>
                  {i !== events.length - 1 && <div className="w-px flex-1 bg-border my-2" />}
                </div>
                <div className="space-y-1 pb-4">
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{event.time}</span>
                  <p className="text-[12px] font-bold leading-relaxed group-hover:text-sky-600 transition-colors">
                    {event.text}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
               <Zap className="h-8 w-8 text-muted-foreground/20 mb-2" />
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">Awaiting match events...</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommentaryFeed;
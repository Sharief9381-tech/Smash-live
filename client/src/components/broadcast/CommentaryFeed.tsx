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
    <div className="glass-panel p-8 rounded-[3rem] h-[450px] flex flex-col space-y-6 border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[#0B1F3A]">
          <Zap className="h-4 w-4 text-sky-500 fill-current" />
          AI Commentary
        </h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Analysis</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="group flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-sky-600 border border-slate-100 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  {event.type === 'score' ? <Target className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
                </div>
                {i !== events.length - 1 && <div className="w-px flex-1 bg-slate-100 my-3" />}
              </div>
              <div className="space-y-1.5 pb-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.time}</span>
                <p className="text-sm font-bold leading-relaxed text-[#0B1F3A] group-hover:text-sky-600 transition-colors">
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
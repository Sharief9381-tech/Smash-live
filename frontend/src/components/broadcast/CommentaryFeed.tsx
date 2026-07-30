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
  events?: Commentary[];
}

const CommentaryFeed = ({ events = [] }: CommentaryFeedProps) => {
  return (
    <div className="glass-panel p-6 rounded-[2rem] h-[350px] flex flex-col space-y-6 border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[#0B1F3A]">
          <Zap className="h-3.5 w-3.5 text-sky-500 fill-current" />
          AI Commentary
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {events.length > 0 ? events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="group flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-sky-600 border border-slate-100">
                  {event.type === 'score' ? <Target className="h-3.5 w-3.5" /> : <Flame className="h-3.5 w-3.5" />}
                </div>
                {i !== events.length - 1 && <div className="w-px flex-1 bg-slate-100 my-2" />}
              </div>
              <div className="space-y-1 pb-4">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{event.time}</span>
                <p className="text-[12px] font-bold leading-relaxed text-[#0B1F3A]">
                  {event.text}
                </p>
              </div>
            </motion.div>
          )) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-2 opacity-30">
               <Zap className="h-8 w-8 text-slate-300" />
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Awaiting match events...</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommentaryFeed;
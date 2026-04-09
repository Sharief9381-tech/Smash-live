"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Zap } from 'lucide-react';
import { Commentary } from '@/types/match';

interface AICommentaryProps {
  logs: Commentary[];
}

const AICommentary = ({ logs }: AICommentaryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-card rounded-2xl flex flex-col h-[300px]">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-sm uppercase tracking-wider">AI Commentary</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-primary rounded-full animate-ping" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Processing</span>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="mt-1">
                {log.type === 'highlight' ? (
                  <Zap className="h-4 w-4 text-yellow-500" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-1.5" />
                )}
              </div>
              <div className="space-y-1">
                <p className={`text-sm ${log.type === 'highlight' ? 'text-white font-medium' : 'text-muted-foreground'}`}>
                  {log.text}
                </p>
                <span className="text-[10px] font-mono text-muted-foreground/50">{log.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {logs.length === 0 && (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
            Waiting for first point...
          </div>
        )}
      </div>
    </div>
  );
};

export default AICommentary;
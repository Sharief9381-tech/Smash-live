import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface BroadcastCardProps {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  viewers?: number;
  status: 'live' | 'upcoming' | 'replay';
  startTime?: string;
}

const BroadcastCard = ({ id, title, subtitle, thumbnail, viewers, status, startTime }: BroadcastCardProps) => {
  return (
    <Link to={`/broadcast/${id}`}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card group rounded-[2.5rem] overflow-hidden border-white/5 hover:border-primary/30 transition-all"
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 grayscale-[30%] group-hover:grayscale-0"
          />
          
          <div className="absolute top-4 left-4 flex gap-2">
            {status === 'live' && (
              <Badge className="bg-red-500 text-white animate-pulse border-none font-black text-[10px]">
                LIVE
              </Badge>
            )}
            {status === 'upcoming' && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-none font-black text-[10px]">
                UPCOMING
              </Badge>
            )}
            {status === 'replay' && (
              <Badge variant="outline" className="border-white/20 text-white font-black text-[10px]">
                REPLAY
              </Badge>
            )}
          </div>

          {status === 'live' && viewers && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <Users className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-black text-white">{viewers.toLocaleString()}</span>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <div className="h-14 w-14 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_30px_rgba(182,255,42,0.4)] scale-75 group-hover:scale-100 transition-transform">
              <Play className="h-6 w-6 fill-current" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{subtitle}</span>
            {startTime && (
              <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {startTime}
              </span>
            )}
          </div>
          <h3 className="text-lg font-black tracking-tight truncate group-hover:text-primary transition-colors">{title}</h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default BroadcastCard;
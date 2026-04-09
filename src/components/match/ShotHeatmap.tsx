"use client";

import React from 'react';

const ShotHeatmap = () => {
  // Mock data for heatmap points
  const points = [
    { x: '20%', y: '30%', intensity: 0.8 },
    { x: '80%', y: '70%', intensity: 0.6 },
    { x: '50%', y: '50%', intensity: 0.9 },
    { x: '25%', y: '80%', intensity: 0.4 },
    { x: '75%', y: '20%', intensity: 0.7 },
    { x: '10%', y: '50%', intensity: 0.5 },
    { x: '90%', y: '40%', intensity: 0.3 },
  ];

  return (
    <div className="relative w-full aspect-[2/1] bg-secondary/30 rounded-xl overflow-hidden border border-white/5">
      <div className="absolute inset-0 opacity-20 border border-white/20 m-2">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
      </div>
      
      {points.map((p, i) => (
        <div 
          key={i}
          className="absolute rounded-full blur-md animate-pulse"
          style={{ 
            left: p.x, 
            top: p.y, 
            width: '40px', 
            height: '40px', 
            backgroundColor: `hsla(var(--primary), ${p.intensity})`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      
      <div className="absolute bottom-2 left-2 text-[8px] font-bold text-muted-foreground uppercase">Shot Distribution</div>
    </div>
  );
};

export default ShotHeatmap;
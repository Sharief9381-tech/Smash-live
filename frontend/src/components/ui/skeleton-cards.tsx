import { cn } from '@/lib/utils';

const Pulse = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse bg-slate-100 rounded-xl', className)} />
);

export const MatchCardSkeleton = () => (
  <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm">
    <div className="flex justify-between">
      <Pulse className="h-5 w-16" />
      <Pulse className="h-3 w-3 rounded-full" />
    </div>
    <div className="space-y-2">
      <Pulse className="h-5 w-3/4" />
      <Pulse className="h-4 w-1/2" />
    </div>
    <div className="flex justify-between items-center">
      <Pulse className="h-8 w-16" />
      <Pulse className="h-10 w-10 rounded-xl" />
    </div>
  </div>
);

export const PlayerCardSkeleton = () => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
    <Pulse className="h-10 w-10 rounded-xl shrink-0" />
    <Pulse className="h-10 w-10 rounded-full shrink-0" />
    <div className="flex-1 space-y-2">
      <Pulse className="h-4 w-2/3" />
      <Pulse className="h-3 w-1/2" />
    </div>
    <Pulse className="h-5 w-12" />
  </div>
);

export const TournamentCardSkeleton = () => (
  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
    <div className="flex items-start gap-4">
      <Pulse className="h-14 w-14 rounded-2xl shrink-0" />
      <div className="space-y-2 flex-1">
        <Pulse className="h-5 w-16" />
        <Pulse className="h-6 w-3/4" />
        <Pulse className="h-3 w-1/2" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50">
      {[1,2,3].map(i => <Pulse key={i} className="h-16 rounded-2xl" />)}
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-4">
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4 shadow-sm">
      <div className="flex items-start gap-4">
        <Pulse className="h-20 w-20 rounded-full shrink-0" />
        <div className="space-y-2 flex-1 pt-2">
          <Pulse className="h-5 w-1/2" />
          <Pulse className="h-3 w-1/3" />
          <Pulse className="h-3 w-2/3" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 border-y border-slate-50 py-4">
        {[1,2,3].map(i => <Pulse key={i} className="h-10 rounded-xl" />)}
      </div>
      <Pulse className="h-9 w-full rounded-lg" />
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="grid grid-cols-2 gap-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Pulse className="h-7 w-7 rounded-lg" />
          <Pulse className="h-3 w-16" />
        </div>
        <Pulse className="h-6 w-12" />
      </div>
    ))}
  </div>
);

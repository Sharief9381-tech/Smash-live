import React from 'react';
import { Zap, RefreshCw } from 'lucide-react';

interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback?: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="h-16 w-16 rounded-2xl bg-[#0B1F3A] flex items-center justify-center">
            <Zap className="h-8 w-8 text-sky-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Something went wrong</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
          </div>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            className="flex items-center gap-2 h-12 px-8 bg-[#0B1F3A] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-500 transition-all"
          >
            <RefreshCw className="h-4 w-4" /> Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/** Lightweight inline fallback for smaller sections */
export const SectionErrorFallback = ({ message = 'Failed to load' }: { message?: string }) => (
  <div className="py-12 text-center border-2 border-dashed border-red-100 rounded-2xl bg-red-50/30">
    <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">{message}</p>
    <button onClick={() => window.location.reload()} className="mt-2 text-[9px] font-black text-sky-500 uppercase underline underline-offset-2">
      Retry
    </button>
  </div>
);

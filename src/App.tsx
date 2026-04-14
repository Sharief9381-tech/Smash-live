import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import TournamentDetail from "./pages/TournamentDetail";
import LiveMatch from "./pages/LiveMatch";
import ScoringPage from "./pages/ScoringPage";
import LiveBroadcast from "./pages/LiveBroadcast";
import CourtPage from "./pages/CourtPage";
import BroadcastCenter from "./pages/BroadcastCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/tournaments" element={<TournamentDetail />} />
          <Route path="/live-match" element={<LiveMatch />} />
          <Route path="/broadcast/:matchId" element={<LiveBroadcast />} />
          <Route path="/scoring/:matchId" element={<ScoringPage />} />
          <Route path="/court" element={<CourtPage />} />
          <Route path="/broadcast/center" element={<BroadcastCenter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
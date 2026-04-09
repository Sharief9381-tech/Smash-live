import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LiveMatch from "./pages/LiveMatch";
import Tournaments from "./pages/Tournaments";
import CreateTournament from "./pages/CreateTournament";
import CreateMatch from "./pages/CreateMatch";
import TournamentDetail from "./pages/TournamentDetail";
import PlayerProfile from "./pages/PlayerProfile";
import BroadcastStudio from "./pages/BroadcastStudio";
import LiveStream from "./pages/LiveStream";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/live-match/active" element={<LiveMatch />} />
          <Route path="/live-match/active-:id" element={<LiveMatch />} />
          <Route path="/live-match/create" element={<CreateMatch />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tournaments/create" element={<CreateTournament />} />
          <Route path="/tournament/:id" element={<TournamentDetail />} />
          <Route path="/player/:id" element={<PlayerProfile />} />
          <Route path="/broadcast/studio" element={<BroadcastStudio />} />
          <Route path="/broadcast/:id" element={<LiveStream />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
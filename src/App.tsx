"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LiveMatch from "./pages/LiveMatch";
import Tournaments from "./pages/Tournaments";
import CreateTournament from "./pages/CreateTournament";
import TournamentDetail from "./pages/TournamentDetail";
import PlayerProfile from "./pages/PlayerProfile";
import EditProfile from "./pages/EditProfile";
import LiveBroadcast from "./pages/LiveBroadcast";
import CreateBroadcast from "./pages/CreateBroadcast";
import Rankings from "./pages/Rankings";
import News from "./pages/News";
import MatchArchive from "./pages/MatchArchive";
import Smashed from "./pages/Smashed";
import Login from "./pages/Login";
import Court from "./pages/Court";
import BroadcastCenter from "./pages/BroadcastCenter";
import CreateIndividualMatch from "./pages/CreateIndividualMatch";
import ScoringPage from "./pages/ScoringPage";
import Onboarding from "./pages/Onboarding";
import RegisterParticipant from "./pages/RegisterParticipant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  
  if (!userProfile.onboardingComplete && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/court" element={<ProtectedRoute><Court /></ProtectedRoute>} />
          <Route path="/dashboard" element={<Navigate to="/court" replace />} />
          <Route path="/smashed" element={<Smashed />} />
          <Route path="/live-match/active" element={<LiveMatch />} />
          <Route path="/live-match/create" element={<ProtectedRoute><CreateIndividualMatch /></ProtectedRoute>} />
          <Route path="/scoring/:matchId" element={<ProtectedRoute><ScoringPage /></ProtectedRoute>} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tournaments/create" element={<ProtectedRoute><CreateTournament /></ProtectedRoute>} />
          <Route path="/tournament/:id" element={<TournamentDetail />} />
          <Route path="/player/me" element={<ProtectedRoute><PlayerProfile /></ProtectedRoute>} />
          <Route path="/player/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/news" element={<News />} />
          <Route path="/archive" element={<MatchArchive />} />
          <Route path="/broadcast/create" element={<ProtectedRoute><CreateBroadcast /></ProtectedRoute>} />
          <Route path="/broadcast/center" element={<ProtectedRoute><BroadcastCenter /></ProtectedRoute>} />
          <Route path="/broadcast/:id" element={<LiveBroadcast />} />
          <Route path="/register/:slug" element={<RegisterParticipant />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
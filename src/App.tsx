import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LiveMatch from "./pages/LiveMatch";
import Tournaments from "./pages/Tournaments";
import CreateTournament from "./pages/CreateTournament";
import CreateMatch from "./pages/CreateMatch";
import TournamentDetail from "./pages/TournamentDetail";
import PlayerProfile from "./pages/PlayerProfile";
import EditProfile from "./pages/EditProfile";
import LiveBroadcast from "./pages/LiveBroadcast";
import CreateBroadcast from "./pages/CreateBroadcast";
import Rankings from "./pages/Rankings";
import News from "./pages/News";
import MatchArchive from "./pages/MatchArchive";
import Login from "./pages/Login";
import Smashed from "./pages/Smashed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) return <Navigate to="/smashed" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthCheck><Index /></AuthCheck>} />
          <Route path="/login" element={<AuthCheck><Login /></AuthCheck>} />
          <Route path="/smashed" element={<ProtectedRoute><Smashed /></ProtectedRoute>} />
          <Route path="/dashboard" element={<Navigate to="/smashed" replace />} />
          <Route path="/live-match/active" element={<LiveMatch />} />
          <Route path="/live-match/active-:id" element={<LiveMatch />} />
          <Route path="/live-match/create" element={<ProtectedRoute><CreateMatch /></ProtectedRoute>} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tournaments/create" element={<ProtectedRoute><CreateTournament /></ProtectedRoute>} />
          <Route path="/tournament/:id" element={<TournamentDetail />} />
          <Route path="/player/me" element={<ProtectedRoute><PlayerProfile /></ProtectedRoute>} />
          <Route path="/player/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/news" element={<News />} />
          <Route path="/archive" element={<MatchArchive />} />
          <Route path="/broadcast/create" element={<ProtectedRoute><CreateBroadcast /></ProtectedRoute>} />
          <Route path="/broadcast/:id" element={<LiveBroadcast />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
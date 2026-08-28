import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, Users, MapPin, 
  ChevronLeft, Activity, Globe, Loader2, Copy, Check, QrCode, Download
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { TournamentAPI } from '@/services/api';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const tourney = await TournamentAPI.getById(id!);
        setTournament({ ...tourney, id: tourney._id || tourney.id });
        const athletes = await TournamentAPI.getParticipants(tourney._id || tourney.id);
        setParticipants(athletes);
      } catch (err) {
        // fallback to localStorage
        const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
        const localMatch = localTourneys.find((t: any) => t.id === id || t.slug === id);
        if (localMatch) {
          setTournament(localMatch);
          const storageKey = `participants_${localMatch.id || localMatch.slug}`;
          setParticipants(JSON.parse(localStorage.getItem(storageKey) || '[]'));
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) loadData();
  }, [id]);

  const registrationLink = tournament ? `${window.location.origin}/register/${tournament.slug}` : "";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(registrationLink)}`;

  const copyLink = () => {
    if (!tournament) return;
    navigator.clipboard.writeText(registrationLink);
    setCopied(true);
    showSuccess("Registration link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_${tournament.name.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess("QR Downloaded!");
    } catch (e) {
      showError("Download failed.");
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="h-10 w-10 text-sky-500 animate-spin" /></div>;

  if (!tournament) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20">
        <Navbar />
        <main className="container flex flex-col items-center justify-center py-40 gap-6 text-center px-6">
           <Trophy className="h-16 w-16 text-slate-200" />
           <div className="space-y-2">
             <h2 className="text-3xl font-black text-[#0B1F3A] uppercase italic">Circuit Expired</h2>
             <p className="text-slate-500 font-medium max-w-sm">The registration protocol for this circuit has been cleared.</p>
           </div>
           <Button onClick={() => navigate('/tournaments')} className="bg-[#0B1F3A] text-white px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-none shadow-xl">Return to Hub</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3A] pb-32">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/tournaments')}
              className="p-2 -ml-2 text-slate-400 hover:text-[#0B1F3A] transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-sky-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Registry Active</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-sky-500 text-white border-none font-black px-4 h-6 text-[8px] uppercase rounded-full">{tournament.status?.toUpperCase() || "ACTIVE"}</Badge>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">ID: {String(tournament.id).slice(-6).toUpperCase()}</span>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight uppercase italic leading-none">{tournament.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-sky-500" /> {tournament.city}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-sky-500" /> {tournament.start_date || tournament.startDate}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-sky-500" /> {participants.length} Entries</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <h3 className="text-sm font-black uppercase italic text-[#0B1F3A]">Entry Roster</h3>
                <Activity className="h-4 w-4 text-sky-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {participants.length > 0 ? participants.map((p: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#0B1F3A] flex items-center justify-center text-sky-400 font-black text-[10px] uppercase shadow-inner">{p.name[0]}</div>
                    <div className="overflow-hidden">
                      <p className="font-black text-[#0B1F3A] uppercase text-xs truncate">{p.name}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">{p.smash_id || p.smashId || "Dossier Active"}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center opacity-40">
                    <Users className="h-10 w-10 mx-auto text-slate-200 mb-3" />
                    <p className="font-black text-slate-400 uppercase text-[9px] tracking-widest italic">No entries synchronized yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B1F3A] p-8 rounded-[2.5rem] text-white space-y-6 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <Trophy className="h-8 w-8 text-sky-400" />
                <QrCode className="h-6 w-6 text-white/20" />
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-2xl shadow-inner inline-block mx-auto relative group/qr">
                  <img src={qrUrl} alt="QR Code" className="w-full aspect-square rounded-lg" />
                  <Button 
                    onClick={downloadQR}
                    className="absolute -bottom-2 -right-2 h-10 w-10 bg-sky-500 text-white rounded-xl shadow-lg hover:bg-sky-400 border-none p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-black italic tracking-tighter uppercase">Athlete Entry</h3>
                  <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest leading-relaxed">Show this QR to athletes for instant circuit registration.</p>
                </div>

                <Button 
                  onClick={copyLink}
                  className={cn(
                    "w-full h-11 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all border-none active:scale-95",
                    copied ? "bg-green-500 hover:bg-green-600" : "bg-sky-500 hover:bg-sky-400"
                  )}
                >
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Link Copied" : "Copy Entry Link"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TournamentDetail;
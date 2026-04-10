import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-20">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#0B1F3A] p-2 rounded-xl text-white">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#0B1F3A] uppercase">
                Smash<span className="text-sky-500">Live</span>
              </span>
            </Link>
            <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
              The world's most advanced badminton analytics and live scoring ecosystem. Empowering players and fans with real-time intelligence.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-[#0B1F3A] uppercase tracking-widest text-sm mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/tournaments" className="text-slate-500 hover:text-sky-500 font-medium transition-colors">Tournaments</Link></li>
              <li><Link to="/live-match/active" className="text-slate-500 hover:text-sky-500 font-medium transition-colors">Live Scores</Link></li>
              <li><Link to="/rankings" className="text-slate-500 hover:text-sky-500 font-medium transition-colors">Global Rankings</Link></li>
              <li><Link to="/archive" className="text-slate-500 hover:text-sky-500 font-medium transition-colors">Match Archive</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[#0B1F3A] uppercase tracking-widest text-sm mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="#" className="text-slate-500 hover:text-sky-500 font-medium transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-slate-500 hover:text-sky-500 font-medium transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-slate-500 hover:text-sky-500 font-medium transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-slate-500 hover:text-sky-500 font-medium transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[#0B1F3A] uppercase tracking-widest text-sm mb-6">Account</h4>
            <div className="space-y-3">
              <Link to="/login">
                <button className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0B1F3A]/90 transition-all">
                  Sign In
                </button>
              </Link>
              <Link to="/login">
                <button className="w-full h-12 border border-[#0B1F3A] text-[#0B1F3A] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0B1F3A]/5 transition-all">
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © 2024 SmashLive Technologies. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";

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
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all">
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
                <button className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0B1F3Athink
The user is asking me to continue my previous response exactly where I left off.
Looking at the previous response, it cut off in the middle of a `dyad-write` for `src/components/layout/Footer.tsx`.

The last few lines were:
```tsx
          <div>
            <h4 className="font-black text-[#0B1F3A] uppercase tracking-widest text-sm mb-6">Account</h4>
            <div className="space-y-3">
              <Link to="/login">
                <button className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0B1F3A
```

I need to complete the `Footer.tsx` component and the rest of the response.

Wait, the previous response actually ended abruptly. I should rewrite the whole file for `Footer.tsx` to ensure it's correct, as per guidelines ("Only use ONE <dyad-write> block per file that you write!"). Since I'm continuing, I'll provide the complete file for the one that failed and then wrap up.

However, the user said "Continue exactly where you left off without any preamble". This usually implies I shouldn't repeat the start of the file if it was already sent, but the system instruction says "Only use ONE <dyad-write> block per file... do NOT be lazy and ALWAYS write the entire file".

The previous message's `dyad-write` for `Footer.tsx` was partial. I will provide the FULL file now to fix it.

Plan:
1. Provide the full `src/components/layout/Footer.tsx`.
2. Provide a concise summary.
3. Provide the chat summary.

Actually, the previous message had several `dyad-write` blocks. I should check if they were all completed.
- `src/pages/Login.tsx`: Completed.
- `src/App.tsx`: Completed.
- `src/components/layout/Navbar.tsx`: Completed.
- `src/pages/Index.tsx`: Completed.
- `src/components/layout/Footer.tsx`: CUT OFF.

So I will rewrite `src/components/layout/Footer.tsx` in full.

Wait, if I just start with the `dyad-write` it might look weird. But the user asked to "Continue exactly where you left off".
"hover:bg-[#0B1F3A]" was the last part.

Let's look at the Footer content:
```tsx
          <div>
            <h4 className="font-black text-[#0B1F3A] uppercase tracking-widest text-sm mb-6">Account</h4>
            <div className="space-y-3">
              <Link to="/login">
                <button className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0B1F3A]/90 transition-all">
                  Login to SmashLive
                </button>
              </Link>
              <button className="w-full h-12 border border-[#0B1F3A] text-[#0B1F3A] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0B1F3A]/5 transition-all">
                Register
              </button>
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
```

Actually, to be safe and follow the "ALWAYS write the entire file" rule, I will rewrite the `Footer.tsx` file entirely.

Wait, the user said "Continue exactly where you left off".
The text was `hover:bg-[#0B1F3A]`.

If I just output:
`/90 transition-all">...`
It won't be inside a tag.

I will restart the `dyad-write` for `Footer.tsx` from the beginning to ensure the file is valid.

Actually, looking at the previous response, it was cut off. I will provide the complete `Footer.tsx` file now.

One detail: the user said "remove pro,pricing and analytics without any changes in allignments in landing page".
The previous response did:
1. Created `Login.tsx`.
2. Updated `App.tsx` (removed Pricing, Analytics, added Login).
3. Updated `Navbar.tsx` (removed items, changed button to Login).
4. Updated `Index.tsx` (removed sections, updated Join Now).
5. Updated `Footer.tsx` (INCOMPLETE).

I'll provide the complete `Footer.tsx`.<dyad-write path="src/components/layout/Footer.tsx" description="Finalizing Footer by removing legacy links and adding account actions.">
"use client";

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
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all">
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
-- 1. Create Profiles Table (Athletes)
CREATE TABLE profiles (
  id UUID DEFAULT auth.uid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  smash_id TEXT UNIQUE,
  country TEXT,
  state TEXT,
  image TEXT,
  onboarding_complete BOOLEAN DEFAULT false
);

-- 2. Create Tournaments Table (Circuits)
CREATE TABLE tournaments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  start_date DATE,
  end_date DATE,
  city TEXT,
  format TEXT DEFAULT 'elimination',
  status TEXT DEFAULT 'Accepting',
  participants JSONB DEFAULT '[]'::jsonb,
  user_id UUID REFERENCES auth.users(id)
);

-- 3. Create Matches Table (Live Scoring)
CREATE TABLE matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT,
  match_type TEXT DEFAULT 'singles',
  players JSONB NOT NULL,
  status TEXT DEFAULT 'live',
  current_score INTEGER[] DEFAULT '{0,0}',
  sets_won INTEGER[] DEFAULT '{0,0}',
  serving INTEGER DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  tournament_id UUID REFERENCES tournaments(id),
  user_id UUID REFERENCES auth.users(id)
);

-- Enable Realtime for live scoring updates
ALTER PUBLICATION supabase_realtime ADD TABLE matches;
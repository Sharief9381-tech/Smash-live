import { createClient } from '@supabase/supabase-js';

// These variables are automatically injected once you link Supabase in the Integrations tab.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase connection missing. Please link your project in the Integrations tab.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
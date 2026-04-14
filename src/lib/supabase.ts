import { createClient } from '@supabase/supabase-base';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Please ensure you've connected the integration.");
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
import { createClient } from '@supabase/supabase-js';

// These variables are provided after linking a Supabase project via the Integrations tab
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Initialize the client
// Note: If you haven't linked Supabase yet, the app will now use these placeholders instead of throwing an error on load.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
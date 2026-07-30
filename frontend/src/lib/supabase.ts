import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have a valid, non-placeholder URL
export const isCloudConfigured = !!supabaseUrl && 
                                supabaseUrl.startsWith('https://') && 
                                !supabaseUrl.includes('your-project') &&
                                !supabaseUrl.includes('placeholder');

// Fallback to local placeholders to prevent the app from crashing entirely
export const supabase = createClient(
  isCloudConfigured ? supabaseUrl! : 'https://placeholder.supabase.co',
  isCloudConfigured ? supabaseAnonKey! : 'placeholder-key'
);
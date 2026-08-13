import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if real credentials (not placeholders) are provided
const isConfigured = supabaseUrl && 
                     supabaseAnonKey && 
                     !supabaseUrl.includes('your-project-id') && 
                     !supabaseAnonKey.includes('your-anon-public-key');

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

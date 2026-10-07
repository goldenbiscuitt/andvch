import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qdxbzdcpbmjjuwivmxjh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeGJ6ZGNwYm1qanV3aXZteGpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5Nzc3MzIsImV4cCI6MjEwMDU1MzczMn0.Qye602AOuSt5eYS5RhfsK4fSCkModibAFv-Z9hAZj64';

// Only initialize if real credentials (not placeholders) are provided
const isConfigured = supabaseUrl && 
                     supabaseAnonKey && 
                     !supabaseUrl.includes('your-project-id') && 
                     !supabaseAnonKey.includes('your-anon-public-key');

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

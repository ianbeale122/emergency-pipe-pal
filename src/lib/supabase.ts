
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public anon key (safe to expose in client code)
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

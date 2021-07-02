import { SupabaseClient } from '@supabase/supabase-js';

const supabaseKey = process.env.SUPABASE_API_KEY as string;
const supabaseUrl = process.env.SUPABASE_URL as string;

export const supabase = new SupabaseClient(supabaseUrl, supabaseKey, {
  autoRefreshToken: true,
  detectSessionInUrl: true,
});

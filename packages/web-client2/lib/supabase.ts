import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  autoRefreshToken: true,
  detectSessionInUrl: true,
});

export function getPublicEnv() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

  return {
    supabaseUrl,
    supabaseAnonKey,
    isSupabaseConfigured: Boolean(supabaseUrl && supabaseAnonKey),
  };
}

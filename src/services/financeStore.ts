/**
 * Future data-access layer for authenticated user records.
 * Phase D+ will replace in-memory FinanceContext with Supabase queries
 * scoped by auth.uid() and Row Level Security.
 */
export const FINANCE_STORE_MODE = 'local-empty' as const;

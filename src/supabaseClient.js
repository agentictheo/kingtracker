import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://iqfxysimszpncgxuaezn.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZnh5c2ltc3pwbmNneHVhZXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1NzQzNTAsImV4cCI6MjAyNTE0NDM1MH0.nOLZfWMSuH27q8Y_w5g8_kPVLVzs3x47yVxJvV0U0Wk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

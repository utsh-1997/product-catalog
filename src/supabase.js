import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfxcgwxqeycvyjxiohgo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5meGNnd3hxZXljdnlqeGlvaGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTcwMzQsImV4cCI6MjA5NDIzMzAzNH0.aBYuWHmVcAjWRrNlpjsPfFJ88s8TbZa17HyUO9wWwLI';

export const supabase = createClient(supabaseUrl, supabaseKey);
// Supabase configuration
const SUPABASE_URL = 'https://sbuwxhijqfdrznblnieb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidXd4aGlqcWZkcnpuYmxuaWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjAzNDcsImV4cCI6MjA5MjkzNjM0N30.WCPTa7vRQ77MeMAigjbYMKONkXiRH-ynlpzPrXBrPbM';

const COURSE_ID = 'reels';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

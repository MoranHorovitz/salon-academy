// Supabase ping to prevent project from sleeping
export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://sbuwxhijqfdrznblnieb.supabase.co/rest/v1/enrollments?limit=1',
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidXd4aGlqcWZkcnpuYmxuaWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjAzNDcsImV4cCI6MjA5MjkzNjM0N30.WCPTa7vRQ77MeMAigjbYMKONkXiRH-ynlpzPrXBrPbM',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidXd4aGlqcWZkcnpuYmxuaWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjAzNDcsImV4cCI6MjA5MjkzNjM0N30.WCPTa7vRQ77MeMAigjbYMKONkXiRH-ynlpzPrXBrPbM'
        }
      }
    );
    res.status(200).json({ ok: true, status: response.status });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}

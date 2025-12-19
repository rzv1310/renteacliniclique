import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limits
const RATE_LIMITS = {
  perMinute: 3,
  perHour: 10,
  perDay: 20
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract client IP
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('x-real-ip') 
      || 'unknown';

    console.log(`Checking rate limits for IP: ${clientIP}`);

    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing');
      return new Response(
        JSON.stringify({ error: 'Serviciu temporar indisponibil.' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate time boundaries
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Count requests per minute
    const { count: minuteCount, error: minuteError } = await supabaseAdmin
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .eq('function_name', 'generate-implant-visualization')
      .gte('created_at', oneMinuteAgo.toISOString());

    if (minuteError) {
      console.error('Error checking minute rate limit:', minuteError);
    }

    // Count requests per hour
    const { count: hourCount, error: hourError } = await supabaseAdmin
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .eq('function_name', 'generate-implant-visualization')
      .gte('created_at', oneHourAgo.toISOString());

    if (hourError) {
      console.error('Error checking hour rate limit:', hourError);
    }

    // Count requests per day
    const { count: dayCount, error: dayError } = await supabaseAdmin
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .eq('function_name', 'generate-implant-visualization')
      .gte('created_at', oneDayAgo.toISOString());

    if (dayError) {
      console.error('Error checking day rate limit:', dayError);
    }

    const usedMinute = minuteCount ?? 0;
    const usedHour = hourCount ?? 0;
    const usedDay = dayCount ?? 0;

    const remainingMinute = Math.max(0, RATE_LIMITS.perMinute - usedMinute);
    const remainingHour = Math.max(0, RATE_LIMITS.perHour - usedHour);
    const remainingDay = Math.max(0, RATE_LIMITS.perDay - usedDay);

    // Determine which limit is the most restrictive
    let limitType: 'minute' | 'hour' | 'day' | null = null;
    if (remainingMinute === 0) limitType = 'minute';
    else if (remainingHour === 0) limitType = 'hour';
    else if (remainingDay === 0) limitType = 'day';

    console.log(`Rate limits for IP ${clientIP}: minute=${usedMinute}/${RATE_LIMITS.perMinute}, hour=${usedHour}/${RATE_LIMITS.perHour}, day=${usedDay}/${RATE_LIMITS.perDay}`);

    return new Response(
      JSON.stringify({
        limits: {
          minute: { used: usedMinute, limit: RATE_LIMITS.perMinute, remaining: remainingMinute },
          hour: { used: usedHour, limit: RATE_LIMITS.perHour, remaining: remainingHour },
          day: { used: usedDay, limit: RATE_LIMITS.perDay, remaining: remainingDay }
        },
        canGenerate: remainingMinute > 0 && remainingHour > 0 && remainingDay > 0,
        limitType
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error checking rate limits:', error);
    return new Response(
      JSON.stringify({ error: 'Eroare la verificarea limitelor.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

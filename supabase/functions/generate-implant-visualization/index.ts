import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Valid implant types and size range
const VALID_IMPLANT_TYPES = ['rotund', 'anatomic', 'ergonomic'];
const MIN_IMPLANT_SIZE = 200;
const MAX_IMPLANT_SIZE = 500;
const MAX_IMAGE_SIZE = 7000000; // ~5MB base64

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

    console.log(`Request from IP: ${clientIP}`);

    // Initialize Supabase admin client for rate limiting
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

    // Check rate limits
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

    if (minuteCount !== null && minuteCount >= RATE_LIMITS.perMinute) {
      console.log(`Rate limit exceeded (per minute) for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Ați depășit limita de 3 încercări pe minut. Vă rugăm așteptați câteva secunde.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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

    if (hourCount !== null && hourCount >= RATE_LIMITS.perHour) {
      console.log(`Rate limit exceeded (per hour) for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Ați depășit limita de 10 încercări pe oră. Vă rugăm încercați mai târziu.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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

    if (dayCount !== null && dayCount >= RATE_LIMITS.perDay) {
      console.log(`Rate limit exceeded (per day) for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Ați atins limita zilnică de 20 de încercări. Reveniți mâine.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { imageBase64, implantType, implantSize } = await req.json();
    
    // Input validation
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Date imagine invalide.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (imageBase64.length > MAX_IMAGE_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Imaginea este prea mare. Maximum 5MB.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!implantType || !VALID_IMPLANT_TYPES.includes(implantType)) {
      return new Response(
        JSON.stringify({ error: 'Tip de implant invalid.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof implantSize !== 'number' || implantSize < MIN_IMPLANT_SIZE || implantSize > MAX_IMPLANT_SIZE) {
      return new Response(
        JSON.stringify({ error: `Mărime implant invalidă. Trebuie să fie între ${MIN_IMPLANT_SIZE} și ${MAX_IMPLANT_SIZE}cc.` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('API key not configured');
      return new Response(
        JSON.stringify({ error: 'Serviciu temporar indisponibil.' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing visualization request: type=${implantType}, size=${implantSize}cc, IP=${clientIP}`);

    // Log request for rate limiting BEFORE calling AI (to prevent abuse even if AI fails)
    const { error: insertError } = await supabaseAdmin
      .from('rate_limits')
      .insert({
        ip_address: clientIP,
        function_name: 'generate-implant-visualization'
      });

    if (insertError) {
      console.error('Error logging rate limit:', insertError);
    } else {
      console.log(`Rate limit logged for IP: ${clientIP}`);
    }

    // Build the prompt based on implant parameters
    const sizeDescription = implantSize < 300 ? "subtil, natural" : 
                           implantSize < 400 ? "moderat, echilibrat" : 
                           "generos, plin";
    
    const typeDescription = implantType === "rotund" ? "rotunde, cu volum uniform și aspect plin" :
                           implantType === "anatomic" ? "anatomice în formă de lacrimă, cu aspect natural" :
                           "ergonomice, adaptive și naturale";

    const editPrompt = `Transform this image to show a realistic breast augmentation result with ${implantType} implants of ${implantSize}cc. 
The result should show ${sizeDescription} enhancement with ${typeDescription}.
Keep the original person's features, clothing, and background exactly the same.
Only enhance the chest area to show a natural-looking augmentation result.
The enhancement should be subtle, professional, and realistic - as if showing an actual surgical result.
Maintain proper proportions and natural body contours.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: editPrompt
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Prea multe cereri. Încercați din nou în câteva secunde." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Serviciu temporar indisponibil." }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Nu s-a putut genera vizualizarea. Încercați din nou.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("AI Response structure:", JSON.stringify(data, null, 2).substring(0, 1000));

    // Extract the generated image
    const generatedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImage) {
      const nativeFinishReason = data.choices?.[0]?.native_finish_reason as string | undefined;
      console.error(
        "No image in response. native_finish_reason=",
        nativeFinishReason,
        "Full response:",
        JSON.stringify(data)
      );

      const tips = nativeFinishReason === "IMAGE_SAFETY"
        ? [
            "Folosiți o fotografie îmbrăcată (sutien/top) – fără nuditate",
            "Evitați close-up foarte strâns pe zona bustului",
            "Fotografie frontală clară, lumină bună, fundal simplu",
            "Zona bustului să fie vizibilă, dar într-un context natural"
          ]
        : [
            "Folosiți o fotografie frontală clară",
            "Asigurați iluminare bună și uniformă",
            "Zona bustului să fie vizibilă",
            "Evitați fundaluri aglomerate"
          ];

      const helpfulMessage = nativeFinishReason === "IMAGE_SAFETY"
        ? "AI-ul nu a putut genera imaginea (filtru de siguranță). Încercați cu o fotografie diferită."
        : "AI-ul nu a generat o imagine. Încercați cu o fotografie diferită.";

      // IMPORTANT: return 200 so the client can display tips (supabase.invoke treats non-2xx as error)
      return new Response(
        JSON.stringify({ error: helpfulMessage, tips, showTips: true, reason: nativeFinishReason ?? null }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        generatedImage,
        message: "Vizualizare generată cu succes"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Visualization error occurred:', error);
    return new Response(
      JSON.stringify({ error: 'Eroare la generarea vizualizării. Încercați din nou.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

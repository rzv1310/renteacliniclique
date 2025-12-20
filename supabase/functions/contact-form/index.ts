import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limit configuration
const RATE_LIMITS = {
  perMinute: 3,
  perHour: 10,
  perDay: 30,
};

// Validation constants
const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const MAX_PHONE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 1000;
const MIN_MESSAGE_LENGTH = 10;
const MIN_NAME_LENGTH = 2;

// Validation regex patterns
const NAME_PATTERN = /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(\+40|0)[0-9]{9}$/;

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

// Sanitize string input
function sanitizeString(input: string, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

// Validate form data server-side
function validateFormData(data: ContactFormData): { valid: boolean; error?: string } {
  // First name validation
  if (!data.firstName || data.firstName.length < MIN_NAME_LENGTH) {
    return { valid: false, error: "Prenumele trebuie să aibă cel puțin 2 caractere" };
  }
  if (data.firstName.length > MAX_NAME_LENGTH) {
    return { valid: false, error: "Prenumele nu poate depăși 50 de caractere" };
  }
  if (!NAME_PATTERN.test(data.firstName)) {
    return { valid: false, error: "Prenumele poate conține doar litere" };
  }

  // Last name validation
  if (!data.lastName || data.lastName.length < MIN_NAME_LENGTH) {
    return { valid: false, error: "Numele trebuie să aibă cel puțin 2 caractere" };
  }
  if (data.lastName.length > MAX_NAME_LENGTH) {
    return { valid: false, error: "Numele nu poate depăși 50 de caractere" };
  }
  if (!NAME_PATTERN.test(data.lastName)) {
    return { valid: false, error: "Numele poate conține doar litere" };
  }

  // Email validation
  if (!data.email || !EMAIL_PATTERN.test(data.email)) {
    return { valid: false, error: "Adresa de email nu este validă" };
  }
  if (data.email.length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: "Email-ul nu poate depăși 100 de caractere" };
  }

  // Phone validation
  if (!data.phone || !PHONE_PATTERN.test(data.phone)) {
    return { valid: false, error: "Numărul de telefon trebuie să fie în format românesc" };
  }

  // Message validation
  if (!data.message || data.message.length < MIN_MESSAGE_LENGTH) {
    return { valid: false, error: "Mesajul trebuie să aibă cel puțin 10 caractere" };
  }
  if (data.message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: "Mesajul nu poate depăși 1000 de caractere" };
  }

  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("x-real-ip") ||
                     "unknown";

    console.log(`Contact form request from IP: ${clientIP.slice(0, 10)}***`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ error: "Eroare de configurare server" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limits
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from("rate_limits")
      .select("created_at")
      .eq("ip_address", clientIP)
      .eq("function_name", "contact-form")
      .gte("created_at", oneDayAgo.toISOString());

    if (rateLimitError) {
      console.error("Rate limit query error:", rateLimitError);
    }

    const requests = rateLimitData || [];
    const requestsLastMinute = requests.filter(
      (r) => new Date(r.created_at!) >= oneMinuteAgo
    ).length;
    const requestsLastHour = requests.filter(
      (r) => new Date(r.created_at!) >= oneHourAgo
    ).length;
    const requestsLastDay = requests.length;

    // Check if rate limited
    if (requestsLastMinute >= RATE_LIMITS.perMinute) {
      console.log(`Rate limit exceeded (minute) for IP: ${clientIP.slice(0, 10)}***`);
      return new Response(
        JSON.stringify({ 
          error: "Prea multe mesaje. Te rugăm să aștepți un minut." 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (requestsLastHour >= RATE_LIMITS.perHour) {
      console.log(`Rate limit exceeded (hour) for IP: ${clientIP.slice(0, 10)}***`);
      return new Response(
        JSON.stringify({ 
          error: "Prea multe mesaje. Te rugăm să încerci mai târziu." 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (requestsLastDay >= RATE_LIMITS.perDay) {
      console.log(`Rate limit exceeded (day) for IP: ${clientIP.slice(0, 10)}***`);
      return new Response(
        JSON.stringify({ 
          error: "Limită zilnică atinsă. Te rugăm să revii mâine." 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
    let body: ContactFormData;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Date invalide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      firstName: sanitizeString(body.firstName, MAX_NAME_LENGTH),
      lastName: sanitizeString(body.lastName, MAX_NAME_LENGTH),
      email: sanitizeString(body.email, MAX_EMAIL_LENGTH).toLowerCase(),
      phone: sanitizeString(body.phone, MAX_PHONE_LENGTH).replace(/\s/g, ""),
      message: sanitizeString(body.message, MAX_MESSAGE_LENGTH),
    };

    // Server-side validation
    const validation = validateFormData(sanitizedData);
    if (!validation.valid) {
      console.log(`Validation failed: ${validation.error}`);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record this request for rate limiting
    const { error: insertError } = await supabase
      .from("rate_limits")
      .insert({
        ip_address: clientIP,
        function_name: "contact-form",
      });

    if (insertError) {
      console.error("Failed to record rate limit:", insertError);
    }

    // Log the contact form submission without PII for GDPR compliance
    console.log("Contact form submitted successfully:", {
      messageLength: sanitizedData.message.length,
      timestamp: new Date().toISOString(),
      success: true,
    });

    // In a real implementation, you would:
    // 1. Store the message in a database table
    // 2. Send an email notification
    // 3. Integrate with a CRM system
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Mesajul a fost trimis cu succes!" 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "A apărut o eroare neașteptată" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

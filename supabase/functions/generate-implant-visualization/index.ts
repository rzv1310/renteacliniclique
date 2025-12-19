import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Valid implant types and size range
const VALID_IMPLANT_TYPES = ['rotund', 'anatomic', 'ergonomic'];
const MIN_IMPLANT_SIZE = 200;
const MAX_IMPLANT_SIZE = 500;
const MAX_IMAGE_SIZE = 7000000; // ~5MB base64

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Autentificare necesară pentru a utiliza simulatorul.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

    console.log(`Processing visualization request: type=${implantType}, size=${implantSize}cc`);

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
        model: "google/gemini-2.5-flash-image-preview",
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
      console.error("Gateway error:", response.status);
      
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
    console.log("Visualization generated successfully");
    
    // Extract the generated image
    const generatedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImage) {
      console.error("No image in response");
      return new Response(
        JSON.stringify({ error: 'Nu s-a putut genera imaginea. Încercați din nou.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
    console.error('Visualization error occurred');
    return new Response(
      JSON.stringify({ error: 'Eroare la generarea vizualizării. Încercați din nou.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

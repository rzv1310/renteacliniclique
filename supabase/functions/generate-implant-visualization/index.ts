import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Generating visualization for ${implantType} implant, ${implantSize}cc`);

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

    console.log('Sending request to AI gateway...');

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
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Prea multe cereri. Încercați din nou în câteva secunde." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credite insuficiente pentru generarea AI." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received successfully");
    
    // Extract the generated image
    const generatedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImage) {
      console.error("No image in response:", JSON.stringify(data));
      throw new Error("Nu s-a putut genera imaginea");
    }

    return new Response(
      JSON.stringify({ 
        generatedImage,
        message: data.choices?.[0]?.message?.content || "Vizualizare generată cu succes"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in generate-implant-visualization:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Eroare la generarea vizualizării' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

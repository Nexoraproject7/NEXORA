export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          reply: "Nexora AI Backend działa! 🚀"
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    try {
      const body = await request.json();
      const message = body.message || "";

      const aiResponse = await env.AI.run(
        "@cf/meta/llama-3.1-8b-instruct",
        {
          messages: [
            {
              role: "system",
              content:
                "Jesteś Nexora AI — pomocnym, nowoczesnym asystentem sztucznej inteligencji. Odpowiadaj jasno i po polsku."
            },
            {
              role: "user",
              content: message
            }
          ]
        }
      );

      return new Response(
        JSON.stringify({
          reply: aiResponse.response
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          reply: "Nexora AI napotkała problem podczas generowania odpowiedzi."
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
};

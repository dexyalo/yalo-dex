
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (url.pathname === "/api/health") {
      return Response.json({
        success: true,
        message: "YALO PAY API is running",
        version: "1.0.0"
      }, { headers });
    }

    if (url.pathname === "/api/products" && request.method === "GET") {
      try {
        if (!env.BITREFILL_API_KEY) {
          return Response.json({
            success: false,
            message: "Bitrefill API key is not configured"
          }, { status: 500, headers });
        }

        const response = await fetch(
          "https://api.bitrefill.com/v2/products",
          {
            headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${env.BITREFILL_API_KEY}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return Response.json({
            success: false,
            message: "Bitrefill request failed",
            details: data
          }, { status: response.status, headers });
        }

        return Response.json({
          success: true,
          products: data
        }, { headers });

      } catch (error) {
        return Response.json({
          success: false,
          message: "Unable to fetch products"
        }, { status: 500, headers });
      }
    }

    return Response.json({
      success: false,
      message: "Route not found"
    }, { status: 404, headers });
  }
};

import db from "@/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("productId");

  if (id) {
    const product = await db.products.findUnique({ where: { id } });
    try {
      return Response.json(product, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    try {
      const products = await db.products.findMany({
        orderBy: { created_at: "desc" },
        take: 10,
      });
      return Response.json(products, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch products" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}

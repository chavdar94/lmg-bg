import ProductsSection from "../components/ProductsSection/ProductsSection";
import LatestNews from "../components/LatestNews/LatestNews";
import { Products, CartProduct } from "@/definitions/types";
import db from "@/lib/client";

export default async function Home() {
  const products: Products = await db.products.findMany({
    orderBy: { created_at: "desc" },
    take: 8,
  });

  const productsWithQuantity: CartProduct[] = products.map((product) => ({
    ...product,
    quantity: undefined,
  }));

  return (
    <>
      <LatestNews />
      <ProductsSection products={productsWithQuantity} />
    </>
  );
}

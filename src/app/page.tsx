import ProductsSection from "../components/ProductsSection/ProductsSection";
import LatestNews from "../components/LatestNews/LatestNews";
import { Products, CartProduct, Product } from "@/definitions/types";
import { cache } from "react";
import { getLatestProducts } from "./actions";
import { Prisma } from "@prisma/client";

export const revalidate = 86400;

export default cache(async function Home() {
  const products: Products = await getLatestProducts();

  const productsWithQuantity: Product[] = products.map((product) => ({
    ...product,
    quantity: 0,
  }));

  return (
    <>
      <LatestNews />
      <ProductsSection products={productsWithQuantity} />
    </>
  );
});

import ProductsSection from "../components/ProductsSection/ProductsSection";
import LatestNews from "../components/LatestNews/LatestNews";
import { Products, CartProduct } from "@/definitions/types";
import { cache } from "react";
import { getLatestProducts } from "./actions";

export default cache(async function Home() {
  const products: Products = await getLatestProducts();

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
});

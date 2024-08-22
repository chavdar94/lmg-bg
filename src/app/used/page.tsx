import { getUsedProducts } from "./actions";
import UsedProductCard from "@/components/UsedProduct/UsedProductCard";

const UsedProducts = async () => {
  const products = await getUsedProducts();

  if (products.length === 0) {
    return (
      <h1 className="text-3xl text-center font-semibold">
        В момента няма продукти втора употреба
      </h1>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-auto mt-10 w-full">
      {products.map((product) => {
        const mutadedProduct = { ...product, quantity: 0 };
        return <UsedProductCard key={product.id} product={mutadedProduct} />;
      })}
    </div>
  );
};

export default UsedProducts;

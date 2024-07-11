import productsJson from "@/data/products.json";
import ProductCard from "../ProductCard/ProductCard";

const ProductsSection = async () => {
  const products = Object.values(productsJson[0]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-20 px-4">
      {products.map((product) => (
        <div key={product.code} className="flex justify-center">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsSection;

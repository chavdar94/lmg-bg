import productsJson from "@/data/products.json";
import ProductCard from "../ProductCard/ProductCard";

const ProductsSection = async () => {
  const products = Object.values(productsJson[0]);

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mt-20">
      {products.map((product) => (
        <div key={product.code} className="w-[18%]">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsSection;

import { BriefProduct, CartProduct, Product } from "@/definitions/types";
import ProductCard from "../ProductCard/ProductCard";

type Products = Product[];

const ProductsSection = ({ products }: { products: Products }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-3xl font-bold uppercase self-start">
        Най-новите продукти
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-10">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;

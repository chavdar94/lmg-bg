import { Product } from "@/definitions/types";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border-2 flex flex-col justify-between text-center hover:border-3 hover:border-slate-300 hover:shadow-lg transition-all duration-300 ease-in-out w-full max-w-xs p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-around mb-6">
          <Image
            src={product?.main_picture_url!}
            width={200}
            height={200}
            alt={product?.name!}
            className="w-48 h-48 object-contain mx-auto"
          />
          <p className="px-2 text-xs mt-2">
            {product.name} - {product.category}
          </p>
          <p className="px-2 font-bold">{product.price} лв.</p>
        </div>
        <div className="px-4 mt-auto">
          {/* <button className="border border-slate-200 w-full text-sm cursor-pointer px-4 py-1 font-bold hover:bg-slate-600 hover:text-slate-100 transition-colors duration-300 ease-in-out">
            Добави в количка
          </button> */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

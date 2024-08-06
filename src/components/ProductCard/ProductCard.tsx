import { CartProduct } from "@/definitions/types";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const ProductCard = ({ product }: { product: CartProduct }) => {
  return (
    <div className="border-2 flex flex-col justify-between text-center  hover:shadow-lg transition-all duration-300 ease-in-out w-full h-[400px] max-w-xs p-4">
      <div className="flex flex-col justify-between h-full">
        <Link href={`/products/${product.category}/${product.id}`}>
          <div className="flex flex-col justify-around mb-6">
            <Image
              src={
                product?.main_picture_url! != "http://www.mostcomputers.bg"
                  ? product?.main_picture_url!
                  : "/categoriesImages/no-image.jpg"
              }
              width={200}
              height={200}
              alt={product?.name!}
              className="w-48 h-48 object-contain mx-auto"
            />
            <p className="px-2 text-xs mt-2">
              {product.name} - {product.category}
            </p>
            <p className="px-2 font-bold">
              {formatPrice(product.price!, {
                currency: "BGN",
                notation: "standard",
                IntlFormat: "bg-BG",
              })}
            </p>
          </div>
        </Link>
        <div className="px-4 mt-auto">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

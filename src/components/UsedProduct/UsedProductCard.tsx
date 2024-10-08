import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { UsedCartProduct } from "@/definitions/types";
import Link from "next/link";

type Props = { product: UsedCartProduct };
const UsedProductCard = ({ product }: Props) => {
  return (
    <div className="md:w-full border-2 flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300 ease-in-out h-[400px] p-4">
      <div className="flex flex-col justify-between h-full">
        <Link href={`/categories/${product.slug}/${product.id}`}>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={`/${product.main_picture_url}`}
              width={200}
              height={200}
              alt={product.name!}
              className="w-48 h-48 object-contain mx-auto"
            />
            <p className="px-2 text-xs mt-2">
              {product.name} - {product.category}
            </p>
            <p className="px-2 font-bold">
              {formatPrice(product.price_with_vat!, {
                currency: "BGN",
                notation: "standard",
                IntlFormat: "bg-BG",
              })}
            </p>
          </div>
        </Link>
        <div className="px-4 mt-auto">
          <AddToCartButton className="p-2 w-full" product={product} />
        </div>
      </div>
    </div>
  );
};
export default UsedProductCard;

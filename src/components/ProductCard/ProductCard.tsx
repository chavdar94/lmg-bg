import { CartProduct, ProductCardType } from "@/definitions/types";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { calculateCurrency, formatPrice } from "@/lib/utils";
import Link from "next/link";

const ProductCard = async ({ product }: { product: ProductCardType }) => {
  const disabled = product.product_status === "В наличност" ? false : true;
  const first = product.gallery?.[0];

  const image = first
    ? /^https?:\/\/www\.mostcomputers\.bg/.test(first)
      ? first
      : `/${first}`
    : "/no-image.png";

  return (
    <div className="md:w-full border-2 flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300 ease-in-out h-[400px] p-4">
      <div className="flex flex-col justify-between h-full">
        <Link href={`/categories/${product.slug}/${product.id}`}>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={image}
              width={200}
              height={200}
              alt={product.name!}
              className="w-48 h-48 object-contain mx-auto"
            />
            <p className="px-2 text-xs mt-2">{product.name}</p>
            <div className="flex justify-center items-center">
              <p className="px-2 font-bold">
                {formatPrice(product.price_eur!, {
                  currency: "EUR",
                  notation: "standard",
                  IntlFormat: "bg-BG",
                })}
              </p>

              <p className="text-sm text-gray-600">
                {`(${formatPrice(product.price_bgn!, {
                  currency: "BGN",
                  notation: "standard",
                  IntlFormat: "bg-BG",
                })})`}
              </p>
            </div>
          </div>
        </Link>
        <div className="px-4 mt-auto">
          <AddToCartButton
            disabled={disabled}
            className={`p-2 w-full ${
              disabled ? "hover:text-slate-900" : "hover:text-slate-100"
            }`}
            product={product as ProductCardType}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

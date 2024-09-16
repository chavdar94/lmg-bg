import { CartProduct, Currency, ProductCardType } from "@/definitions/types";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { calculateCurrency, formatPrice } from "@/lib/utils";
import Link from "next/link";

const ProductCard = async ({ product }: { product: ProductCardType }) => {
  const price = await calculateCurrency(
    product.price!,
    product.currency! as Currency
  );

  const disabled = product.product_status === "Наличен" ? false : true;

  return (
    <div className="md:w-full border-2 flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300 ease-in-out h-[400px] p-4">
      <div className="flex flex-col justify-between h-full">
        <Link href={`/categories/${product.slug}/${product.id}`}>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={
                product.main_picture_url !== "http://www.mostcomputers.bg"
                  ? `${process.env.NEXT_URL}${product.main_picture_url}!`
                  : "/categoriesImages/no-image.jpg"
              }
              width={200}
              height={200}
              alt={product.name!}
              className="w-48 h-48 object-contain mx-auto"
            />
            <p className="px-2 text-xs mt-2">
              {product.name} - {product.category}
            </p>
            <p className="px-2 font-bold">
              {formatPrice(price, {
                currency: "BGN",
                notation: "standard",
                IntlFormat: "bg-BG",
              })}
            </p>
          </div>
        </Link>
        <div className="px-4 mt-auto">
          <AddToCartButton
            disabled={disabled}
            className={`p-2 w-full ${
              disabled ? "hover:text-slate-900" : "hover:text-slate-100"
            }`}
            product={product as CartProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { CartProduct } from "@/definitions/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

function OrderItem({ item }: { item: CartProduct }) {
  const first = item.gallery?.[0];
  const image = first
    ? /^https?:\/\/www\.mostcomputers\.bg/.test(first)
      ? first
      : `/${first}`
    : "/no-image.png";

  return (
    <div className="border-2 flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300 ease-in-out w-full max-w-xs p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-around mb-6">
          <Image
            src={image}
            width={200}
            height={200}
            alt={item?.name!}
            className="w-48 h-48 object-contain mx-auto"
          />
          <p className="px-2 text-xs mt-2">
            {item.name} - {item.category}
          </p>
          <p className="px-2 text-sm mt-2">
            {item.quantity} бр. x{" "}
            {formatPrice(item.price_eur!, {
              currency: "EUR",
              notation: "standard",
              IntlFormat: "bg-BG",
            })}
          </p>
          <p className="px-2 font-bold">
            {formatPrice(item.price_eur! * item.quantity!, {
              currency: "EUR",
              notation: "standard",
              IntlFormat: "bg-BG",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
export default OrderItem;

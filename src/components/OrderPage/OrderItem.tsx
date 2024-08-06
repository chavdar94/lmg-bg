import { CartProduct } from "@/definitions/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

function OrderItem({ item }: { item: CartProduct }) {
  return (
    <div className="border-2 flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300 ease-in-out w-full max-w-xs p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-around mb-6">
          <Image
            src={item?.main_picture_url!}
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
            {formatPrice(item.price!, {
              currency: "BGN",
              notation: "standard",
              IntlFormat: "bg-BG",
            })}
          </p>
          <p className="px-2 font-bold">
            {formatPrice(item.price! * item.quantity!, {
              currency: "BGN",
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

import { CartProduct as CartProductType } from "@/definitions/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useCart } from "@/hooks/use-cart";
import { X } from "lucide-react";

function CartProduct({ product }: { product: CartProductType }) {
  const { decreaseItem, addItem, removeItem } = useCart();

  return (
    <>
      <div className="space-y-3 py-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
              <Image
                src={product?.main_picture_url!}
                alt={product?.name!}
                fill
                className="absolute object-cover"
              />
            </div>
            <div className="flex flex-col self-start">
              <span className="line-clamp-1 text-sm font-medium mb-1">
                {product.name}
              </span>

              <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                {product.category}
              </span>

              <div className="mt-4 text-xs text-muted-foreground">
                <button
                  onClick={() => removeItem(product.id)}
                  className="flex items-center gap-0.5"
                >
                  <X className="w-3 h-4" />
                  Премахни
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1 font-medium">
            <span className="ml-auto line-clamp-1 text-sm">
              {formatPrice(product.price! * product.quantity!)}
            </span>
            <div className="flex items-center justify-center gap-3 text-sm pt-2">
              <button onClick={() => decreaseItem(product.id)}>-</button>
              <p>{product.quantity}</p>
              <button onClick={() => addItem(product)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
}
export default CartProduct;

"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import CartProduct from "./CartItem";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { useEffect } from "react";
import { Separator } from "../ui/separator";

const Cart = () => {
  const { items } = useCart();
  let itemCount = items.length;

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price!,
    0
  );
  const shipping = 5.99;

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          size={28}
          className="flex-shrink-0 text-gra-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Продукти ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea>
              <div className="flex w-full flex-col pr-6">
                {items.map(({ product }) => (
                  <CartProduct key={product.id} product={product} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <div className="space-y-4 pr-6">
              <div className="spce-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Доставка:</span>
                  <span>{formatPrice(shipping)}</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Общо:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Поръчаи
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-empty-cart.png"
                fill
                alt="empty shopping cart"
              />
            </div>
            <div className="text-xl font-semibol">Количката е празна</div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Cart;

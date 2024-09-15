"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { CartProduct, UsedCartProduct } from "@/definitions/types";
import { cn } from "@/lib/utils";

const AddToCartButton = ({
  product,
  className,
  disabled = false,
}: {
  product: CartProduct | UsedCartProduct;
  className?: string;
  disabled?: boolean;
}) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <button
      onClick={() => {
        addItem(product as CartProduct);
        setIsSuccess(true);
      }}
      disabled={disabled}
      className={cn(
        "border border-slate-200 text-sm cursor-pointer px-4 py-1 font-bold hover:bg-slate-600 transition-colors duration-300 ease-in-out",
        className,
        disabled && "cursor-not-allowed hover:bg-transperant"
      )}
    >
      {isSuccess
        ? "Добавено!"
        : disabled
        ? "Няма в наличност"
        : "Добави в количката"}
    </button>
  );
};

export default AddToCartButton;

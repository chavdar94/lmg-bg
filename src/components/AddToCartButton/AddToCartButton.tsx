"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { CartProduct } from "@/definitions/types";
import { cn } from "@/lib/utils";

const AddToCartButton = ({
  product,
  className,
}: {
  product: CartProduct;
  className?: string;
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
        addItem(product);
        setIsSuccess(true);
      }}
      className={cn(
        "border border-slate-200 text-sm cursor-pointer px-4 py-1 font-bold hover:bg-slate-600 hover:text-slate-100 transition-colors duration-300 ease-in-out",
        className
      )}
    >
      {isSuccess ? "Добавено!" : "Добави в количката"}
    </button>
  );
};

export default AddToCartButton;

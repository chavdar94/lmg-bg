"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { CartProduct } from "@/definitions/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

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
      className={buttonVariants({
        size: "lg",
        className: cn(
          "text-sm cursor-pointer font-bold rounded-none",
          className
        ),
      })}
    >
      {isSuccess ? "Добавено!" : "Добави в количката"}
    </button>
  );
};

export default AddToCartButton;

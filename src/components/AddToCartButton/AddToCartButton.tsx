"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { CartProduct } from "@/definitions/types";

const AddToCartButton = ({ product }: { product: CartProduct }) => {
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
      className="border border-slate-200 w-full text-sm cursor-pointer px-4 py-1 font-bold hover:bg-slate-600 hover:text-slate-100 transition-colors duration-300 ease-in-out"
    >
      {isSuccess ? "Добавено!" : "Добави в количката"}
    </button>
  );
};

export default AddToCartButton;

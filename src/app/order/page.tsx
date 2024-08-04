"use client";

import OrderPageItems from "@/components/OrderPage/OrderPageItems";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { sendMail } from "@/lib/mail";
import { useState } from "react";
import { PartyPopperIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function OrderPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, clearCart } = useCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !validateEmail(email)) {
      setError(true);
      setLoading(false);
      return;
    }
    try {
      const res = await sendMail({ items, email });
      if (res.id) {
        setSuccess(true);
      }
    } catch (err) {
      // Handle the error
      console.error("Failed to send email", err);
    } finally {
      setEmail("");
      clearCart();
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <>
      {items.length === 0 && !success ? (
        <OrderError />
      ) : !success ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Завърши поръчката</h1>
          <h2 className="text-xl">
            Общо:{" "}
            <span className="font-bold italic">
              {formatPrice(
                items.reduce(
                  (sum, item) => sum + item.price! * item.quantity!,
                  0
                ),
                { currency: "BGN", notation: "standard", IntlFormat: "bg-BG" }
              )}
            </span>
          </h2>
          <p className="italic text-muted-foreground">
            Цената е без включена доставка!
          </p>
        </div>
      ) : null}

      <div className="h-full flex flex-col gap-8 justify-center items-center">
        {success ? <SuccesfulOrder /> : <OrderPageItems items={items} />}
        {!success && items.length > 0 && (
          <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-4">
            <div className="w-full">
              <label className="pl-1 text-xl font-semibold" htmlFor="email">
                Имейл:
              </label>
              {error && (
                <p className="text-red-500">Моля, въведете валиден имейл</p>
              )}
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                type="text"
                name="email"
                id="email"
                className="w-full border-2 border-slate-300 p-2 rounded-md"
              />
            </div>
            <button
              disabled={loading}
              className={buttonVariants({ className: "m-auto w-1/2" })}
            >
              Поръчай
              {loading && (
                <Spinner className="text-slate-100 ml-4" size={"small"} />
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

function SuccesfulOrder() {
  return (
    <div className="h-full flex flex-col gap-3 justify-center items-center">
      <div className="flex gap-3 justify-center items-center">
        <h1 className="text-3xl font-bold">Успешно направена поръчка!</h1>
        <PartyPopperIcon size={32} />
      </div>
      <p className="text-xl">
        В най-кратко време ще се свържем с вас на посочения имейл с детайли за
        поръчката.
      </p>
      <p className="text-xl">Благодарим ви за покупката!</p>
      <Link href="/" className={buttonVariants({ className: "w-1/2" })}>
        Начало
      </Link>
    </div>
  );
}

function OrderError() {
  return (
    <div className="h-full flex flex-col gap-3 justify-center items-center">
      <p className="text-xl">
        Изглежда количката е празна! Моля изберете продукт и се върнете.
      </p>
      <Link href="/" className={buttonVariants({ className: "w-1/2" })}>
        Начало
      </Link>
    </div>
  );
}

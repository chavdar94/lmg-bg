"use client";

import OrderPageItems from "@/components/OrderPage/OrderPageItems";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { sendMail } from "@/lib/mail";
import { useState } from "react";
import { PartyPopperIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function OrderPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, clearCart } = useCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!email) {
      setError(true);
      return;
    }
    const res = await sendMail({ items, email });
    if (res.id) {
      setSuccess(true);
    }
    setEmail("");
    clearCart();
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      {!success && <h1 className="text-3xl font-bold">Завърши поръчката</h1>}
      {success ? <SuccesfulOrder /> : <OrderPageItems items={items} />}
      {!success && (
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-4">
          <div className="w-full">
            <label className="pl-1 text-xl font-semibold" htmlFor="email">
              Имейл:
            </label>
            {error && <p className="text-red-500">Моля, въведете имейл</p>}
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
            Поръчаи
            {loading && (
              <Spinner className="text-slate-100 ml-4" size={"small"} />
            )}
          </button>
        </form>
      )}
    </div>
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
    </div>
  );
}

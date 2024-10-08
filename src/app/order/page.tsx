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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    email: false,
    fullName: false,
    phone: false,
  });
  const [loading, setLoading] = useState(false);
  const { items, clearCart } = useCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !validateEmail(formData.email)) {
      setError({ ...error, email: true });
      setLoading(false);
      return;
    }

    if (!formData.phone || !validatePhoneNumber(formData.phone)) {
      setError({ ...error, phone: true });
      setLoading(false);
      return;
    }

    try {
      const res = await sendMail({ items, ...formData });
      if (res.id) {
        setSuccess(true);
      }
    } catch (err) {
      // Handle the error
      console.error("Failed to send email", err);
    } finally {
      setFormData({ fullName: "", email: "", phone: "" });
      clearCart();
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    // Simple regex for phone number validation
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
                  (sum, item) => sum + item.price_with_vat! * item.quantity!,
                  0
                ),
                { currency: "BGN", notation: "standard", IntlFormat: "bg-BG" }
              )}
            </span>
          </h2>
          <p className="italic text-muted-foreground">
            Цената е без включена доставка!
          </p>
          <p className="italic text-muted-foreground">
            Всички цени са с включено ДДС!
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-8 justify-center items-center">
        {success ? <SuccesfulOrder /> : <OrderPageItems items={items} />}
        {!success && items.length > 0 && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full md:w-1/2 gap-4"
          >
            <div className="w-full space-y-4">
              <div>
                <label className="pl-1 text-xl font-semibold" htmlFor="email">
                  *Имейл за връзка:
                </label>

                {error.email && (
                  <p className="text-red-500">Моля, въведете валиден имейл</p>
                )}
                <input
                  value={formData.email}
                  onChange={(e) => {
                    handleChange(e);
                    setError({ ...error, email: false });
                  }}
                  type="text"
                  name="email"
                  id="email"
                  className="w-full border-2 border-slate-300 p-2"
                />
              </div>

              <div>
                <label className="pl-1 text-xl font-semibold" htmlFor="email">
                  Име:
                </label>

                <input
                  value={formData.fullName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  name="fullName"
                  id="name"
                  className="w-full border-2 border-slate-300 p-2"
                />
              </div>

              <div>
                <label className="pl-1 text-xl font-semibold" htmlFor="email">
                  *Телефон за връзка:
                </label>

                {error.phone && (
                  <p className="text-red-500">
                    Моля, въведете валиден телефонен номер
                  </p>
                )}
                <input
                  value={formData.phone}
                  onChange={(e) => {
                    handleChange(e);
                    setError({ ...error, phone: false });
                  }}
                  type="text"
                  name="phone"
                  id="phone"
                  className="w-full border-2 border-slate-300 p-2"
                />
              </div>
              <p className="text-xs text-slate-500 text-center mt-2">
                Отдел продажби ще се свърже с вас на посочния имейл.
              </p>
            </div>
            <button
              disabled={loading}
              className={buttonVariants({
                className: "m-auto w-full md:w-1/2 rounded-none",
              })}
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

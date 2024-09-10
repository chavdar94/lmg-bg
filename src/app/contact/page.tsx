"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMail } from "@/lib/mail";
import { FormEventHandler, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("@/components/Map/Map").then((mod) => mod.Map), // Adjust this to match your named export
  { ssr: false }
);

const Service = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [pending, setPending] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    setPending(true);

    try {
      const res = await sendContactMail(name, email, message);
      if (res.id) {
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Failed to send email", err);
    } finally {
      setPending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Map />
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-10">
        <div>
          <h2>LMG-BG Сервиз</h2>
          <p>Адрес: София, бул. Патриарх Евтимий 98</p>
        </div>

        <div>
          <p>Телефон: (02) 852 42 22</p>
          <p>Мобилен: 089 741 32 41</p>
        </div>
      </div>
      <hr className="my-4" />
      <h2 className="text-xl pl-2 mb-1">
        Имата въпрос? Изпратете ни имейл и ние ще се свържем с вас!
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-none"
          placeholder="Име:"
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-none"
          placeholder="Имейл:"
        />
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="rounded-none"
          placeholder="Съобщение"
        />
        <Button disabled={pending} type="submit" className="rounded-none">
          Изпрати
          {pending && (
            <Spinner className="text-slate-100 ml-4" size={"small"} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default Service;

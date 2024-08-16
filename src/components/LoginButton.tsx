"use client";

import { buttonVariants } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Spinner } from "./ui/spinner";

const LoginButton = ({ btnText }: { btnText: string }) => {
  const { pending: loading } = useFormStatus();

  return (
    <button
      disabled={loading}
      className={buttonVariants({ className: "m-auto w-full" })}
    >
      {btnText}
      {loading && <Spinner className="text-slate-100 ml-4" size={"small"} />}
    </button>
  );
};
export default LoginButton;

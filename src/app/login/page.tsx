import { Card, Input } from "@nextui-org/react";
import { login } from "./actions";
import LoginButton from "@/components/LoginButton";

export default async function Page() {
  return (
    <Card className="p-4 w-full md:w-1/2 m-auto mt-10">
      <h1 className="text-xl font-semibold m-3">Влез</h1>
      <form action={login}>
        <Input label="Имейл" name="email" id="email" />
        <br />
        <Input label="Парола" type="password" name="password" id="password" />
        <br />
        <LoginButton btnText="Влез" />
      </form>
    </Card>
  );
}

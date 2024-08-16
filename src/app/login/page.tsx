import { Button, Card, Input } from "@nextui-org/react";
import { login } from "./actions";

export default async function Page() {
  return (
    <Card className="p-4 w-full md:w-1/2 m-auto mt-10">
      <h1 className="text-xl font-semibold m-3">Влез</h1>
      <form action={login}>
        <Input label="Имейл" name="email" id="email" />
        <br />
        <Input label="Парола" type="password" name="password" id="password" />
        <br />
        <Button className="w-full" type="submit" color="primary">
          Влез
        </Button>
      </form>
    </Card>
  );
}

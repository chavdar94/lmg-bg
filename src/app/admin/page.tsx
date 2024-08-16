import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/client";
import { redirect } from "next/navigation";

const Admin = async () => {
  const { user } = await validateRequest();
  if (!user?.isAdmin) {
    return redirect("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 uppercase">Добави новина:</h1>
      <form className="flex flex-col gap-4">
        <Label htmlFor="title">Заглавие:</Label>
        <Input id="title" placeholder="Заглавие" />
        <Label htmlFor="content">Съдържание:</Label>
        <Textarea id="content" />
        <Label htmlFor="image">Изображение:</Label>
        <Input id="image" placeholder="Изображение" type="file" />
        <Button type="submit">Създай</Button>
      </form>
    </div>
  );
};
export default Admin;

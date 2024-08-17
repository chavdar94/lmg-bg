import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";

type Props = {
  name: string;
  img: string;
};

export default function CategoryCard({ name, img }: Props) {
  return (
    <Card key={name} className="rounded-none flex flex-col gap-2 w-full">
      <CardContent className="overflow-visible p-0 w-full">
        <img src={img} alt="logo" className="w-full h-48 object-fill mx-auto" />
      </CardContent>
      <CardFooter className="text-small">
        <b>{name}</b>
      </CardFooter>
    </Card>
  );
}

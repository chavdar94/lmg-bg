import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";

type Props = {
  name: string;
  img: string;
};

export default function CategoryCard({ name, img }: Props) {
  return (
    <Card key={name} className="rounded-none flex flex-col gap-2">
      <CardContent className="overflow-visible p-0">
        <Image
          src={img}
          width={192}
          height={192}
          alt="logo"
          className="w-48 h-48 object-fill mx-auto"
          sizes="(max-width: 768px) 100vw, 
                       (max-width: 1200px) 50vw, 
                       33vw"
        />
      </CardContent>
      <CardFooter className="text-small">
        <b>{name}</b>
      </CardFooter>
    </Card>
  );
}

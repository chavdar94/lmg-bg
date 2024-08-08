import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";

type Props = {
  name: string;
  img: string;
};

export default function CategoryCard({ name, img }: Props) {
  return (
    <Card shadow="sm" key={name} isPressable className="rounded-none">
      <CardBody className="overflow-visible p-0">
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
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{name}</b>
      </CardFooter>
    </Card>
  );
}

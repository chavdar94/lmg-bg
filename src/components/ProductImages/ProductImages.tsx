"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

export default function ProductImages({
  images,
}: {
  images: { main_pic: string; gallery: string[] };
}) {
  const [current, setCurrent] = React.useState(0);
  const displayedImage =
    `${process.env.NEXT_URL}${images.gallery[current]}` ||
    `${process.env.NEXT_URL}${images.main_pic}`;

  console.log(displayedImage);

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
      {/* Main Image */}
      <div className="w-full h-80 flex justify-center items-center border border-text-muted-foreground mb-4">
        <Image
          src={displayedImage}
          alt="product image"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Gallery Images */}
      <div className="flex justify-center space-x-2">
        {images.gallery.map((image, index) => {
          return (
            <div
              key={image}
              className={cn(
                "border p-1 cursor-pointer hover:border-orange-600",
                current === index && "border-orange-500"
              )}
              onClick={() => setCurrent(index)}
            >
              <Image src={image} alt="gallery image" width={100} height={100} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

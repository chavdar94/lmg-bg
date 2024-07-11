"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import data from "@/data/carousel.json";
import { type CarouselApi } from "@/app/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image"; // Import Image from next/image

const NewsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative hidden md:block mt-4">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id}>
              <div className="w-full h-96 relative">
                <Image
                  src={item.img}
                  alt={item.description}
                  layout="fill"
                  objectFit="fill"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-white absolute bottom-0 left-1/2 transform -translate-x-1/2">
        {Array.from({ length: count }).map((_, index) => (
          <span className="text-2xl mx-1" key={index}>
            {current === index + 1 ? "●" : "○"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;

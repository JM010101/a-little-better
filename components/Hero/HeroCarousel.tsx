"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";

const portfolioImages = [
  "/portfolios/first.jpg",
  "/portfolios/second.jpg",
  "/portfolios/third.jpg",
  "/portfolios/forth.jpg",
  "/portfolios/fifth.jpg"
];

export default function HeroCarousel() {
  return (
    <Carousel
      className="mt-20 w-full"
      plugins={[
        Autoplay({
          delay: 7000
        }),
        WheelGesturesPlugin()
      ]}
      opts={{
        loop: true,
        align: "center"
      }}
    >
      <CarouselContent>
        {portfolioImages.map((src, index) => (
          <CarouselItem key={index} className="lg:basis-1/2">
            <div className="p-2 bg-neutral-100 h-[550px] rounded-lg flex flex-col justify-center items-center mx-4 md:mx-0 overflow-hidden">
              <Image
                src={src}
                alt={`Portfolio ${index + 1}`}
                width={800}
                height={550}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

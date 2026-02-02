"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { dataLeft, dataRight } from "./data";
import Link from "next/link";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { useRef, useEffect, useState } from "react";

export default function Section1() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const contentAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(30px)",
    config: { tension: 100, friction: 50 }
  });

  return (
    <div ref={ref} className="mt-28 flex flex-row justify-center">
      <div className="w-full max-w-[1200px] md:grid grid-cols-8">
        <div className="col-span-2 text-center md:h-[500px] flex md:flex-col justify-center gap-10 md:gap-0 md:justify-around items-center mb-6 md:mb-0">
          {dataLeft.map(({ src, alt }, index) => (
            <Image
              key={index}
              src={src}
              alt={alt}
              width={150}
              height={150}
              className="max-h-[75px] md:max-h-[150px] w-auto h-auto object-contain"
            />
          ))}
        </div>
        <animated.div style={contentAnimation} className="col-span-4 bg-white dark:bg-transparent flex flex-col justify-center items-center">
          <p className="text-4xl font-medium text-center mx-10 md:mx-0 text-neutral-900 dark:text-neutral-100">
            The devil is in the details.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 text-xl text-center mx-20 md:mx-6 my-8">
            Stop wasting time. Get started today.
          </p>
          <Link href="/contact">
            <Button>
              Get Started <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </animated.div>
        <div className="col-span-2 text-center md:h-[500px] flex md:flex-col justify-center gap-10 md:gap-0 md:justify-around items-center mt-6 md:mt-0">
          {dataRight.map(({ src, alt }, index) => (
            <Image
              key={index}
              src={src}
              alt={alt}
              width={150}
              height={150}
              className="max-h-[75px] md:max-h-[150px] w-auto h-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

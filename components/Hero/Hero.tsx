"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import BackgroundSquares from "../Backgrounds/BackgroundSquares";
import HeroCarousel from "./HeroCarousel";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";

export default function Hero() {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
    config: { tension: 100, friction: 50 }
  });

  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 400,
    config: { tension: 100, friction: 50 }
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    delay: 600,
    config: { tension: 150, friction: 20 }
  });

  const carouselAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 800,
    config: { tension: 100, friction: 50 }
  });

  return (
    <>
      <div className="flex flex-col justify-start items-center mt-20">
        <animated.h1 
          style={titleAnimation}
          className="text-6xl font-medium mt-8 text-center max-w-[600px] text-neutral-900 dark:text-neutral-100"
        >
          A Little Better Goes a Long Way
        </animated.h1>
        <animated.div 
          style={subtitleAnimation}
          className="flex flex-col justify-center items-center mt-7 gap-2 text-2xl text-neutral-500 dark:text-neutral-400 text-center max-w-[700px]"
        >
          <h2>
            Bring your ideas to life in the digital world using modern tools, strategy, and innovation.
          </h2>
        </animated.div>
        <animated.div style={buttonAnimation}>
          <Link href="/contact">
            <Button size="lg" className="mt-6 text-md">
              Get started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </animated.div>
        <animated.div style={carouselAnimation}>
          <HeroCarousel />
        </animated.div>
      </div>
      {/* Background */}
      <BackgroundSquares />
    </>
  );
}

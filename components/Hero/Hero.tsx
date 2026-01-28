import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import BackgroundSquares from "../Backgrounds/BackgroundSquares";
import HeroCarousel from "./HeroCarousel";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col justify-start items-center mt-20">
        <h1 className="text-6xl font-medium mt-8 text-center max-w-[600px]">
          A Little Better Goes a Long Way
        </h1>
        <div className="flex flex-col justify-center items-center mt-7 gap-2 text-2xl text-neutral-500 text-center max-w-[700px]">
          <h2>
            Bring your ideas to life in the digital world using modern tools, strategy, and innovation.
          </h2>
        </div>
        <Link href="/contact">
          <Button size="lg" className="mt-6 text-md">
            Get started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <HeroCarousel />
      </div>
      {/* Background */}
      <BackgroundSquares />
    </>
  );
}

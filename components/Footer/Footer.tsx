"use client";

import FooterColumn from "./FooterColumn";
import { data } from "./data";
import Logo from "../Logo/Logo";
import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const glowAnimation = useSpring({
    x: mousePos.x,
    y: mousePos.y,
    opacity: isHovered ? 0.3 : 0,
    scale: isHovered ? 1 : 0.8,
    config: { tension: 150, friction: 30 }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener("mousemove", handleMouseMove);
      footer.addEventListener("mouseenter", () => setIsHovered(true));
      footer.addEventListener("mouseleave", () => setIsHovered(false));
    }

    return () => {
      if (footer) {
        footer.removeEventListener("mousemove", handleMouseMove);
        footer.removeEventListener("mouseenter", () => setIsHovered(true));
        footer.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, []);

  return (
    <div 
      ref={footerRef}
      className="bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Interactive glow effect */}
      <animated.div
        style={{
          position: "absolute",
          left: glowAnimation.x.to((x) => `${x}px`),
          top: glowAnimation.y.to((y) => `${y}px`),
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 70%)",
          transform: glowAnimation.scale.to((scale) => `translate(-50%, -50%) scale(${scale})`),
          opacity: glowAnimation.opacity,
          pointerEvents: "none",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <div className="w-full max-w-[1000px] px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Logo size="h-10 w-10" withText />
            <div className="flex flex-col gap-3 max-w-md">
              <p className="text-neutral-600 dark:text-neutral-400 italic">
                &ldquo;Rome wasn&apos;t built in a day, but they were laying bricks every hour.&rdquo;
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 italic">
                &ldquo;Every little bit helps. A penny saved is a penny earned.&rdquo;
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 italic">
                &ldquo;Slow and steady wins the race.&rdquo;
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 italic">
                &ldquo;It&apos;s the little things that make the big difference.&rdquo;
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {data.map((section, index) => (
              <FooterColumn key={index} data={section} index={index} />
            ))}
          </div>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center border-t border-neutral-200 dark:border-neutral-800 pt-6">
          © 2026 A Little Better. All rights reserved.
        </p>
      </div>
    </div>
  );
}

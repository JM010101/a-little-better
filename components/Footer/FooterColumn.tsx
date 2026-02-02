"use client";

import Link from "next/link";
import { useState } from "react";
import { useSpring, animated, to } from "@react-spring/web";

export default function FooterColumn({ data, index }: { data: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const columnAnimation = useSpring({
    transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
    opacity: isHovered ? 1 : 0.9,
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div 
      style={columnAnimation}
      className="flex flex-col justify-start items-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <animated.p 
        style={{
          transform: columnAnimation.transform,
        }}
        className="font-medium mb-4"
      >
        {data.title}
      </animated.p>
      {data.links.map((link: any, linkIndex: number) => (
        <InteractiveLink
          key={linkIndex}
          href={link.href}
          name={link.name}
          delay={linkIndex * 50}
        />
      ))}
    </animated.div>
  );
}

function InteractiveLink({ href, name, delay }: { href: string; name: string; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const linkAnimation = useSpring({
    transform: isHovered ? "translateX(5px)" : "translateX(0px)",
    opacity: isHovered ? 1 : 0,
    config: { tension: 400, friction: 25 }
  });

  const underlineAnimation = useSpring({
    width: isHovered ? "100%" : "0%",
    opacity: isHovered ? 1 : 0,
    config: { tension: 300, friction: 20 }
  });

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="mb-4"
    >
      <animated.div
        style={{
          display: "inline-block",
          transform: linkAnimation.transform,
        }}
      >
        <Link
          href={href}
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors relative inline-block"
        >
        {name}
        <animated.div
          style={{
            position: "absolute",
            bottom: "-2px",
            left: 0,
            width: underlineAnimation.width,
            height: "2px",
            background: "linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))",
            opacity: underlineAnimation.opacity,
          }}
          className="rounded-full"
        />
        </Link>
      </animated.div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

interface Props {
  imageSrc: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  index?: number;
}

export default function CardFeature({
  imageSrc,
  icon,
  title,
  description,
  href,
  index = 0
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: index * 100,
    config: { tension: 100, friction: 50 }
  });

  const hoverAnimation = useSpring({
    transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
    boxShadow: isHovered 
      ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div style={cardAnimation}>
      <Link href={href}>
        <animated.div 
          style={hoverAnimation}
          className="flex flex-col justify-start items-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 transition-all cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full rounded-t-lg h-[180px] bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 overflow-hidden relative">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-start items-start w-full py-2 px-4">
            <div className="flex flex-row justify-start items-center gap-1">
              {icon}
              <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{title}</p>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400">{description}</p>
          </div>
        </animated.div>
      </Link>
    </animated.div>
  );
}

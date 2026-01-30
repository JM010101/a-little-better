"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const isHiring = member.name === "hiring...";
  const showImage = member.image && !imageError && !isHiring;
  // Adjust image position for Andrea, Mohammad, Rahul, Maheen, Wealth, and Rafael to show their heads properly
  const needsImageAdjustment = member.name === "Andrea Montrone" || member.name === "Mohammad Asadi" || member.name === "Rahul Singh" || member.name === "Maheen Mashrur" || member.name === "Wealth Hajoh" || member.name === "Rafael Silverio";

  const cardAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(30px)",
    delay: index * 100,
    config: { tension: 100, friction: 50 }
  });

  const hoverAnimation = useSpring({
    transform: isHovered ? "translateY(-5px) scale(1.02)" : "translateY(0px) scale(1)",
    boxShadow: isHovered 
      ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div 
      ref={ref}
      style={{ ...cardAnimation, ...hoverAnimation }}
      className="flex flex-col items-center text-center p-6 rounded-lg transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
        {showImage ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            style={needsImageAdjustment ? { objectPosition: "center 20%" } : { objectPosition: "center center" }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-5xl font-bold">
            {isHiring ? "?" : member.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-medium mb-2">{member.name}</h3>
      <p className="text-neutral-600 text-lg">{member.role}</p>
    </animated.div>
  );
}

interface TeamMembersProps {
  members: TeamMember[];
}

export default function TeamMembers({ members }: TeamMembersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <TeamMemberCard key={index} member={member} index={index} />
      ))}
    </div>
  );
}

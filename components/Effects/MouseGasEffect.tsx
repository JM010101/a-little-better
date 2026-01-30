"use client";

import { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 15;
const PARTICLE_LIFETIME = 2000;

export default function MouseGasEffect() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate velocity
      const vx = (newX - lastMousePosRef.current.x) * 0.1;
      const vy = (newY - lastMousePosRef.current.y) * 0.1;

      lastMousePosRef.current = { x: newX, y: newY };
      setMousePos({ x: newX, y: newY });

      // Create multiple particles for smoother effect
      const newParticles: Particle[] = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + Math.random() + i,
        x: newX + (Math.random() - 0.5) * 10,
        y: newY + (Math.random() - 0.5) * 10,
        vx: vx + (Math.random() - 0.5) * 2,
        vy: vy + (Math.random() - 0.5) * 2,
      }));

      setParticles((prev) => {
        const updated = [...prev, ...newParticles];
        // Keep only last N particles
        return updated.slice(-PARTICLE_COUNT);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles((prev) => {
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.95,
            vy: p.vy * 0.95,
          }))
          .filter((p) => {
            // Remove particles that are too far or have low velocity
            const distance = Math.sqrt(
              Math.pow(p.x - mousePos.x, 2) + Math.pow(p.y - mousePos.y, 2)
            );
            return distance < 200 && (Math.abs(p.vx) > 0.1 || Math.abs(p.vy) > 0.1);
          });
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle, index) => {
        const size = 6 + Math.random() * 4;
        const opacity = 0.3 + Math.random() * 0.4;
        const hue = 200 + Math.random() * 60; // Blue to purple range

        return (
          <GasParticle
            key={particle.id}
            x={particle.x}
            y={particle.y}
            size={size}
            opacity={opacity}
            hue={hue}
            index={index}
          />
        );
      })}
    </div>
  );
}

function GasParticle({
  x,
  y,
  size,
  opacity,
  hue,
  index,
}: {
  x: number;
  y: number;
  size: number;
  opacity: number;
  hue: number;
  index: number;
}) {
  const [spring, api] = useSpring(() => ({
    from: {
      x,
      y,
      scale: 1,
      opacity: 0,
    },
    to: {
      x,
      y,
      scale: 0,
      opacity: opacity,
    },
    config: {
      tension: 150,
      friction: 25,
    },
    delay: index * 30,
  }));

  useEffect(() => {
    api.start({
      to: {
        x,
        y,
        scale: 0,
        opacity: opacity,
      },
    });
  }, [x, y, api, opacity]);

  return (
    <animated.div
      style={{
        position: "absolute",
        left: spring.x.to((x) => `${x}px`),
        top: spring.y.to((y) => `${y}px`),
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `radial-gradient(circle, hsla(${hue}, 70%, 60%, ${opacity}) 0%, hsla(${hue + 20}, 70%, 50%, ${opacity * 0.5}) 100%)`,
        transform: spring.scale.to((scale) => `translate(-50%, -50%) scale(${scale})`),
        opacity: spring.opacity,
        pointerEvents: "none",
        filter: "blur(3px)",
        boxShadow: `0 0 ${size * 2}px hsla(${hue}, 70%, 60%, ${opacity * 0.5})`,
      }}
    />
  );
}

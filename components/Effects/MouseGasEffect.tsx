"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useSpring, animated, to } from "@react-spring/web";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const PARTICLE_COUNT = 40;
const COLORS = [
  { hue: 200, name: "blue" },      // Blue
  { hue: 260, name: "purple" },    // Purple
  { hue: 320, name: "pink" },      // Pink
  { hue: 280, name: "violet" },    // Violet
  { hue: 240, name: "indigo" },    // Indigo
  { hue: 300, name: "magenta" },   // Magenta
];

export default function MouseGasEffect() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate velocity for smooth flow
      const vx = (newX - lastMousePosRef.current.x) * 0.5;
      const vy = (newY - lastMousePosRef.current.y) * 0.5;

      lastMousePosRef.current = { x: newX, y: newY };
      setMousePos({ x: newX, y: newY });

      // Create flowing particles - like water stream
      const newParticles: Particle[] = Array.from({ length: 4 }, (_, i) => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        // Create a trailing effect - particles follow behind the cursor
        const trailOffset = i * 8; // Stagger particles behind cursor
        const flowAngle = Math.atan2(vy, vx) || 0; // Direction of mouse movement
        
        return {
          id: Date.now() + Math.random() + i,
          x: newX - Math.cos(flowAngle) * trailOffset + (Math.random() - 0.5) * 15,
          y: newY - Math.sin(flowAngle) * trailOffset + (Math.random() - 0.5) * 15,
          // Smooth flowing velocity - follow the mouse direction
          vx: vx * 0.8 + (Math.random() - 0.5) * 0.5,
          vy: vy * 0.8 + (Math.random() - 0.5) * 0.5,
          size: 40 + Math.random() * 60, // Much bigger: 40-100px
          hue: color.hue + (Math.random() - 0.5) * 20,
          opacity: 0.5 + Math.random() * 0.3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2, // Slower rotation for smoother flow
        };
      });

      setParticles((prev) => {
        const updated = [...prev, ...newParticles];
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

  // Animate particles with smooth water-like flow
  useEffect(() => {
    const animate = () => {
      setParticles((prev) => {
        return prev
          .map((p) => {
            // Smooth, flowing movement - like water
            // Gentle drift towards mouse position for continuity
            const dx = mousePos.x - p.x;
            const dy = mousePos.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Gentle pull towards cursor for flowing effect
            const pullStrength = distance > 100 ? 0.02 : 0.01;
            const pullX = dx * pullStrength;
            const pullY = dy * pullStrength;
            
            // Very gentle turbulence for organic flow
            const flowTurbulence = Math.sin(Date.now() * 0.0005 + p.id) * 0.3;
            
            return {
              ...p,
              x: p.x + p.vx + pullX + flowTurbulence,
              y: p.y + p.vy + pullY + flowTurbulence,
              // Smooth velocity decay - like water slowing down
              vx: p.vx * 0.96 + pullX,
              vy: p.vy * 0.96 + pullY,
              rotation: p.rotation + p.rotationSpeed,
              opacity: p.opacity * 0.985, // Slower fade for longer trails
              size: p.size * 0.995, // Very slow size reduction
            };
          })
          .filter((p) => {
            const distance = Math.sqrt(
              Math.pow(p.x - mousePos.x, 2) + Math.pow(p.y - mousePos.y, 2)
            );
            return distance < 800 && p.opacity > 0.05 && p.size > 10;
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
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      {particles.map((particle) => (
        <GasParticle
          key={particle.id}
          particle={particle}
        />
      ))}
    </div>
  );
}

function GasParticle({ particle }: { particle: Particle }) {
  const [spring, api] = useSpring(() => ({
    from: {
      x: particle.x,
      y: particle.y,
      scale: 1,
      opacity: 0,
      rotate: particle.rotation,
    },
    to: {
      x: particle.x,
      y: particle.y,
      scale: 0.3,
      opacity: particle.opacity,
      rotate: particle.rotation,
    },
    config: {
      tension: 100,
      friction: 20,
    },
  }));

  useEffect(() => {
    api.start({
      to: {
        x: particle.x,
        y: particle.y,
        scale: 0.3,
        opacity: particle.opacity,
        rotate: particle.rotation,
      },
    });
  }, [particle.x, particle.y, particle.opacity, particle.rotation, api]);

  // Create vibrant gradient with multiple colors
  const hue1 = particle.hue;
  const hue2 = (particle.hue + 60) % 360;
  const hue3 = (particle.hue + 120) % 360;

  return (
    <animated.div
      style={{
        position: "absolute",
        left: spring.x.to((x) => `${x}px`),
        top: spring.y.to((y) => `${y}px`),
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, 
          hsla(${hue1}, 100%, 70%, ${particle.opacity}) 0%,
          hsla(${hue2}, 100%, 65%, ${particle.opacity * 0.8}) 40%,
          hsla(${hue3}, 100%, 60%, ${particle.opacity * 0.5}) 70%,
          hsla(${hue1}, 100%, 50%, ${particle.opacity * 0.2}) 100%)`,
        transform: to(
          [spring.scale, spring.rotate],
          (scale, rotate) => `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`
        ),
        opacity: spring.opacity,
        pointerEvents: "none",
        filter: `blur(${particle.size * 0.15}px)`,
        boxShadow: `
          0 0 ${particle.size * 0.8}px hsla(${hue1}, 100%, 70%, ${particle.opacity * 0.6}),
          0 0 ${particle.size * 1.2}px hsla(${hue2}, 100%, 65%, ${particle.opacity * 0.4}),
          0 0 ${particle.size * 1.6}px hsla(${hue3}, 100%, 60%, ${particle.opacity * 0.2})
        `,
      }}
    />
  );
}

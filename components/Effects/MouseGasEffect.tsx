"use client";

import { useEffect, useState, useRef } from "react";
import { useSpring, animated, to } from "@react-spring/web";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: "star" | "dot" | "sparkle";
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  twinkle: number;
}

const PARTICLE_COUNT = 100;
const PARTICLE_TYPES = [
  { type: "star" as const, color: "#FFD700", size: [8, 15] },      // Yellow stars
  { type: "star" as const, color: "#FFB6C1", size: [6, 12] },      // Pink stars
  { type: "star" as const, color: "#FFFFFF", size: [4, 8] },       // White stars
  { type: "dot" as const, color: "#FFD700", size: [2, 4] },        // Yellow dots
  { type: "sparkle" as const, color: "#FFB6C1", size: [3, 6] },    // Pink sparkles
];

export default function MouseGasEffect() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const clickPosRef = useRef<{ x: number; y: number; isRightClick: boolean } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate velocity for smooth flow
      const vx = (newX - lastMousePosRef.current.x) * 0.5;
      const vy = (newY - lastMousePosRef.current.y) * 0.5;

      lastMousePosRef.current = { x: newX, y: newY };
      setMousePos({ x: newX, y: newY });

      // Create magical sparkle particles - stars and dots
      const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => {
        const particleType = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
        const [minSize, maxSize] = particleType.size;
        const size = minSize + Math.random() * (maxSize - minSize);
        
        // Create a trailing effect - particles follow behind the cursor
        const trailOffset = i * 3; // Stagger particles behind cursor (closer together for longer trail)
        const flowAngle = Math.atan2(vy, vx) || Math.random() * Math.PI * 2;
        const spreadAngle = flowAngle + (Math.random() - 0.5) * 1.2;
        const spreadDistance = Math.random() * 30;
        
        return {
          id: Date.now() + Math.random() + i,
          x: newX - Math.cos(flowAngle) * trailOffset + Math.cos(spreadAngle) * spreadDistance,
          y: newY - Math.sin(flowAngle) * trailOffset + Math.sin(spreadAngle) * spreadDistance,
          // Gentle velocity - particles drift away from cursor
          vx: vx * 0.4 + Math.cos(spreadAngle) * (0.3 + Math.random() * 0.8),
          vy: vy * 0.4 + Math.sin(spreadAngle) * (0.3 + Math.random() * 0.8),
          size,
          type: particleType.type,
          color: particleType.color,
          opacity: 0.7 + Math.random() * 0.3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 3,
          twinkle: Math.random(), // For twinkling effect
        };
      });

      setParticles((prev) => {
        const updated = [...prev, ...newParticles];
        return updated.slice(-PARTICLE_COUNT);
      });
    };

    const handleClick = (e: MouseEvent) => {
      const isRightClick = e.button === 2 || (e as any).which === 3;
      
      // Create explosion particles
      const explosionSize = isRightClick ? 40 : 20; // Right click = bigger explosion
      const particleCount = isRightClick ? 50 : 25; // Right click = more particles
      
      const explosionParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
        const particleType = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
        const [minSize, maxSize] = particleType.size;
        const sizeMultiplier = isRightClick ? 2 : 1;
        const size = (minSize + Math.random() * (maxSize - minSize)) * sizeMultiplier;
        
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const speed = explosionSize * (0.5 + Math.random() * 0.5);
        
        return {
          id: Date.now() + Math.random() + i + 10000,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          type: particleType.type,
          color: particleType.color,
          opacity: 0.9 + Math.random() * 0.1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * (isRightClick ? 15 : 10),
          twinkle: Math.random(),
        };
      });

      setParticles((prev) => {
        const updated = [...prev, ...explosionParticles];
        return updated.slice(-PARTICLE_COUNT);
      });
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // Create bigger explosion for right click
      const explosionSize = 40;
      const particleCount = 50;
      
      const explosionParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
        const particleType = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
        const [minSize, maxSize] = particleType.size;
        const size = (minSize + Math.random() * (maxSize - minSize)) * 2;
        
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const speed = explosionSize * (0.5 + Math.random() * 0.5);
        
        return {
          id: Date.now() + Math.random() + i + 10000,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          type: particleType.type,
          color: particleType.color,
          opacity: 0.9 + Math.random() * 0.1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
          twinkle: Math.random(),
        };
      });

      setParticles((prev) => {
        const updated = [...prev, ...explosionParticles];
        return updated.slice(-PARTICLE_COUNT);
      });
      
      return false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("contextmenu", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Animate particles with magical sparkle effect
  useEffect(() => {
    const animate = () => {
      setParticles((prev) => {
        return prev
          .map((p) => {
            // Magical floating movement - particles drift away gently
            const time = Date.now() * 0.001;
            
            // Gentle floating motion
            const floatX = Math.sin(time * 0.5 + p.id) * 0.3;
            const floatY = Math.cos(time * 0.5 + p.id) * 0.3;
            
            // Twinkling effect
            const twinkle = 0.5 + Math.sin(time * 3 + p.id) * 0.5;
            
            // Check if this is an explosion particle (id > 10000)
            const isExplosion = p.id > 10000;
            const velocityDecay = isExplosion ? 0.95 : 0.98; // Explosion particles slow down faster
            const opacityDecay = isExplosion ? 0.97 : 0.995; // Explosion particles fade faster
            
            return {
              ...p,
              x: p.x + p.vx + (isExplosion ? 0 : floatX), // No float for explosions
              y: p.y + p.vy + (isExplosion ? 0 : floatY),
              // Velocity decay - explosion particles slow down faster
              vx: p.vx * velocityDecay,
              vy: p.vy * velocityDecay,
              rotation: p.rotation + p.rotationSpeed,
              opacity: p.opacity * opacityDecay * twinkle,
              size: p.size,
              twinkle: twinkle,
            };
          })
          .filter((p) => {
            const distance = Math.sqrt(
              Math.pow(p.x - mousePos.x, 2) + Math.pow(p.y - mousePos.y, 2)
            );
            return distance < 1200 && p.opacity > 0.05; // Longer trail distance
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
      {/* Cursor glow effect */}
      <div
        style={{
          position: "absolute",
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 182, 193, 0.3) 50%, transparent 100%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />
      
      {particles.map((particle) => (
        <SparkleParticle
          key={particle.id}
          particle={particle}
        />
      ))}
    </div>
  );
}

function SparkleParticle({ particle }: { particle: Particle }) {
  const [spring, api] = useSpring(() => ({
    from: {
      x: particle.x,
      y: particle.y,
      scale: 0,
      opacity: 0,
      rotate: particle.rotation,
    },
    to: {
      x: particle.x,
      y: particle.y,
      scale: 1,
      opacity: particle.opacity,
      rotate: particle.rotation,
    },
    config: {
      tension: 200,
      friction: 20,
    },
  }));

  useEffect(() => {
    api.start({
      to: {
        x: particle.x,
        y: particle.y,
        scale: 1,
        opacity: particle.opacity * particle.twinkle,
        rotate: particle.rotation,
      },
    });
  }, [particle.x, particle.y, particle.opacity, particle.rotation, particle.twinkle, api]);

  // Render different particle types
  if (particle.type === "star") {
    // Four-pointed star
    const points = 4;
    const outerRadius = particle.size / 2;
    const innerRadius = outerRadius * 0.4;
    
    return (
      <animated.div
        style={{
          position: "absolute",
          left: spring.x.to((x) => `${x}px`),
          top: spring.y.to((y) => `${y}px`),
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          transform: to(
            [spring.scale, spring.rotate],
            (scale, rotate) => `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`
          ),
          opacity: spring.opacity,
          pointerEvents: "none",
          filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))",
        }}
      >
        <svg width={particle.size} height={particle.size} viewBox={`0 0 ${particle.size} ${particle.size}`}>
          <polygon
            points={Array.from({ length: points * 2 }, (_, i) => {
              const angle = (i * Math.PI) / points - Math.PI / 2;
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const x = particle.size / 2 + radius * Math.cos(angle);
              const y = particle.size / 2 + radius * Math.sin(angle);
              return `${x},${y}`;
            }).join(" ")}
            fill={particle.color}
            opacity={spring.opacity.get()}
          />
        </svg>
      </animated.div>
    );
  }

  // Dot or sparkle - circular
  return (
    <animated.div
      style={{
        position: "absolute",
        left: spring.x.to((x) => `${x}px`),
        top: spring.y.to((y) => `${y}px`),
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        borderRadius: "50%",
        background: particle.color,
        transform: spring.scale.to((scale) => `translate(-50%, -50%) scale(${scale})`),
        opacity: spring.opacity,
        pointerEvents: "none",
        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        filter: particle.type === "sparkle" ? "blur(1px)" : "none",
      }}
    />
  );
}

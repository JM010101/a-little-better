"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Slide animation for the toggle
  const slideAnimation = useSpring({
    transform: isDark ? "translateX(100%)" : "translateX(0%)",
    config: { tension: 300, friction: 30 },
  });

  // Icon rotation animation
  const sunAnimation = useSpring({
    opacity: isDark ? 0 : 1,
    transform: isDark ? "rotate(90deg) scale(0.8)" : "rotate(0deg) scale(1)",
    config: { tension: 300, friction: 30 },
  });

  const moonAnimation = useSpring({
    opacity: isDark ? 1 : 0,
    transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.8)",
    config: { tension: 300, friction: 30 },
  });

  if (!mounted) {
    return (
      <div className="w-20 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-20 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
      aria-label="Toggle theme"
      type="button"
    >
      {/* Background segments */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-black" />
        <div className="w-1/2 bg-red-900" />
      </div>

      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 z-10">
        <animated.div
          style={sunAnimation}
          className="flex items-center justify-center w-1/2"
        >
          <Sun className="w-5 h-5 text-white" />
        </animated.div>
        <animated.div
          style={moonAnimation}
          className="flex items-center justify-center w-1/2"
        >
          <Moon className="w-5 h-5 text-white" />
        </animated.div>
      </div>

      {/* Sliding white indicator */}
      <animated.div
        style={slideAnimation}
        className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg z-20"
      />
    </button>
  );
}

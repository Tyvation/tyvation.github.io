"use client";

import { useState, useEffect } from "react";

export default function GlobalMouseGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--primary) 0%, transparent 60%)`,
        mixBlendMode: 'overlay',
        zIndex: 9999,
        opacity: 0.3
      }}
    />
  );
}
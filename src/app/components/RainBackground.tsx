"use client";

import { useEffect, useState } from "react";

export default function RainBackground() {
  const [raindrops, setRaindrops] = useState<Array<{
    id: number;
    left: number;
    animationDuration: string;
    opacity: number;
    height: number;
  }>>([]);

  useEffect(() => {
    const drops = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random() * 0.6 + 0.1,
      height: Math.random() * 100 + 50
    }));
    setRaindrops(drops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-0.5 bg-gradient-to-t from-primary to-transparent animate-rain"
          style={{
            '--start-left': `${drop.left}%`,
            left: `${drop.left}%`,
            height: `${drop.height}px`,
            opacity: drop.opacity,
            transform: 'rotate(25deg)',
            animationDuration: drop.animationDuration,
            animationDelay: `${Math.random() * 10}s`,
          } as React.CSSProperties}
        />
      ))}
      
      <style jsx>{`
        @keyframes rain {
          0% {
            top: -100px;
            left: var(--start-left);
          }
          100% {
            top: 100vh;
            left: calc(var(--start-left) - 25vw);
          }
        }
        
        .animate-rain {
          animation-name: rain;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
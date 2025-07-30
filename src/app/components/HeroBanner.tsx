/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import { archivoBlack, bebasNeue } from "@/app/layout";

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLSpanElement>, cardRef: HTMLSpanElement) => {
    const rect = cardRef.getBoundingClientRect();
    const l = e.clientX - rect.left;
    const t = e.clientY - rect.top;
    const h = rect.height;
    const w = rect.width;
    
    // Pokemon card holographic calculations
    const px = Math.abs(Math.floor(100 / w * l) - 100);
    const py = Math.abs(Math.floor(100 / h * t) - 100);
    const pa = (50 - px) + (50 - py);
    
    // Background positions for gradient and sparkles
    const lp = (50 + (px - 50) / 1.5);
    const tp = (50 + (py - 50) / 1.5);
    const px_spark = (50 + (px - 50) / 2);
    const py_spark = (50 + (py - 50) / 3);
    const p_opc = Math.min(1, Math.max(0.2, (20 + Math.abs(pa) * 1.5) / 100));
    
    // 3D rotation calculations
    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 2) * 1;
    
    // Apply transforms with proper scale and transitions
    cardRef.style.transform = `perspective(1000px) rotateX(${ty}deg) rotateY(${tx}deg) scale(1.2)`;
    cardRef.style.transition = 'transform 0.1s ease-out, background-color 0.5s ease, color 1s';
    
    // Set CSS custom properties for holographic effect
    cardRef.style.setProperty('--bg-x', `${lp}%`);
    cardRef.style.setProperty('--bg-y', `${tp}%`);
    cardRef.style.setProperty('--spark-x', `${px_spark}%`);
    cardRef.style.setProperty('--spark-y', `${py_spark}%`);
    cardRef.style.setProperty('--opacity', `${p_opc}`);
    
    cardRef.classList.add('active');
  };

  const handleCardMouseLeave = (cardRef: HTMLSpanElement) => {
    cardRef.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    cardRef.style.transition = 'transform 0.3s ease-out, background-color 0.5s ease, color 1s';
    
    // Reset holographic effect properties
    cardRef.style.setProperty('--bg-x', '50%');
    cardRef.style.setProperty('--bg-y', '50%');
    cardRef.style.setProperty('--spark-x', '50%');
    cardRef.style.setProperty('--spark-y', '50%');
    cardRef.style.setProperty('--opacity', '0.75');
    
    cardRef.classList.remove('active');
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center group"
    >
      {/* Main text */}
      <div className="relative z-10 text-center p-8">
        <h1 
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black transition-all duration-500 text-center whitespace-nowrap text-foreground ${archivoBlack.className} ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {"TYVATION".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block holo-card mx-1 my-2 p-4 border border-border/50 rounded-xl shadow-lg cursor-default hover:border-accent/70 hover:shadow-2xl hover:shadow-accent/20 hover:z-10 relative overflow-hidden"
              data-text={letter}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                transformStyle: 'preserve-3d',
                isolation: 'isolate',
                willChange: 'transform'
              }}
              onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
            >
              <span className="block text-center font-black relative z-0">
                {letter}
              </span>
            </span>
          ))}
        </h1>
        
        {/* Subtitle */}
        <p 
          className={`mt-4 text-lg md:text-xl text-foreground/70 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          Creative Developer & Designer
        </p>
        
        {/* Animated underline */}
        <div 
          className={`rounded-2xl mx-auto mt-6 h-1 bg-gradient-to-r from-primary to-accent transition-all duration-1000 delay-500 ${
            isVisible ? 'w-32 opacity-100' : 'w-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
}
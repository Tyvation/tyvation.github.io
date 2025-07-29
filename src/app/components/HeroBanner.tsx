/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { archivoBlack, bebasNeue } from "@/app/layout";

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-pointer group"
    >
      {/* Main text */}
      <div className="relative z-10 text-center p-8">
        <h1 
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black transition-all duration-1000 text-center whitespace-nowrap text-foreground ${archivoBlack.className} ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {"TYVATION".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-300 cursor-pointer hover:scale-110"
              data-text={letter}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
              }}
            >
              {letter}
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
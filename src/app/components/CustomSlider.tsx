"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SliderItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface CustomSliderProps {
  items: SliderItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export default function CustomSlider({
  items,
  autoplay = false,
  autoplayDelay = 5000,
  showPagination = true,
  showNavigation = true,
  className = "",
}: CustomSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (autoplay && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
      }, autoplayDelay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, autoplayDelay, isHovered, items.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  return (
    <div 
      className={`relative w-full max-w-4xl mx-auto rounded-3xl bg-transparent overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative h-[400px] overflow-hidden rounded-3xl">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : 
              index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 p-5 z-10 bg-foreground">
              <h2 className="text-xl font-bold mb-1 text-background">{item.title}</h2>
              <p className="text-neutral-400 mb-4">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-white font-semibold bg-primary hover:bg-primary-hover hover:scale-105 rounded-2xl transition"
                >
                  查看專案
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background dark:bg-foreground/80 dark:hover:bg-foreground flex items-center justify-center transition-all hover:scale-110 z-20"
          >
            <svg className="w-5 h-5 text-foreground dark:text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background dark:bg-foreground/80 dark:hover:bg-foreground flex items-center justify-center transition-all hover:scale-110 z-20"
          >
            <svg className="w-5 h-5 text-foreground dark:text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showPagination && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary-hover scale-125"
                  : "bg-background/60 hover:bg-background dark:bg-foreground/60 dark:hover:bg-foreground"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
'use client';
import { useEffect, useRef, useCallback} from 'react';

interface InteractiveGridProps {
  color?: string;
  hoverColor?: string;
  gridSize?: number;
  effectRadius?: number;
  minLineLength?: number;
  maxLineLength?: number;
  lineThickness?: number;
  gapSize?: number;
  transitionDuration?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
}

export default function InteractiveGrid({
  color = 'bg-secondary',
  hoverColor = 'bg-primary',
  gridSize = 35,
  effectRadius = 120,
  minLineLength = 3,
  maxLineLength = 20,
  lineThickness = 2,
  gapSize = 2,
  transitionDuration = 0.2, // eslint-disable-line @typescript-eslint/no-unused-vars
  waveAmplitude = 10,
  waveSpeed = 2
}: InteractiveGridProps = {}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef(false);
  const isVisibleRef = useRef(true);
  const gridElementsRef = useRef<HTMLElement[]>([]);
  const waveElementsRef = useRef<{element: HTMLElement, baseX: number}[]>([]);
  const visibleElementsRef = useRef<Set<number>>(new Set());
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isMouseMovingRef = useRef(false);

  const createGrid = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Clear existing grid
    grid.innerHTML = '';
    gridElementsRef.current = [];
    waveElementsRef.current = [];

    const cols = Math.ceil(window.innerWidth / gridSize);
    const rows = Math.ceil(window.innerHeight / gridSize);
    const fragment = document.createDocumentFragment();

    // Calculate centering offset
    const totalGridWidth = cols * gridSize;
    const offsetX = (window.innerWidth - totalGridWidth) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize + offsetX;
        const y = row * gridSize;

        const container = document.createElement('div');
        container.className = 'absolute pointer-events-none';
        container.setAttribute('data-x', x.toString());
        container.setAttribute('data-y', y.toString());
        container.style.cssText = `left:${x}px;top:${y}px;transform-origin:center;will-change:transform,opacity;opacity:0.4`;

        // Create dot
        const dot = document.createElement('div');
        dot.className = `absolute rounded-full ${color}`;
        dot.setAttribute('data-element', 'dot');
        dot.style.cssText = `width:${lineThickness}px;height:${lineThickness}px;left:${-lineThickness/2}px;top:${-lineThickness/2}px;will-change:opacity`;
        container.appendChild(dot);

        // Create cross lines
        const lines = [
          // Vertical top
          { left: -lineThickness/2, top: -(minLineLength-gapSize)/2-gapSize/2, width: lineThickness, height: (minLineLength-gapSize)/2 },
          // Vertical bottom
          { left: -lineThickness/2, top: gapSize/2, width: lineThickness, height: (minLineLength-gapSize)/2 },
          // Horizontal left
          { left: -(minLineLength-gapSize)/2-gapSize/2, top: -lineThickness/2, width: (minLineLength-gapSize)/2, height: lineThickness },
          // Horizontal right
          { left: gapSize/2, top: -lineThickness/2, width: (minLineLength-gapSize)/2, height: lineThickness }
        ];

        lines.forEach(line => {
          const lineEl = document.createElement('div');
          lineEl.className = `absolute rounded-full ${color}`;
          lineEl.setAttribute('data-element', 'line');
          lineEl.style.cssText = `left:${line.left}px;top:${line.top}px;width:${line.width}px;height:${line.height}px;opacity:0;will-change:opacity,width,height,top,left`;
          container.appendChild(lineEl);
        });

        fragment.appendChild(container);
        gridElementsRef.current.push(container);
        waveElementsRef.current.push({ element: container, baseX: x });
      }
    }

    grid.appendChild(fragment);
  }, [gridSize, lineThickness, minLineLength, gapSize, color]);

  useEffect(() => {
    createGrid();
    window.addEventListener('resize', createGrid);
    return () => window.removeEventListener('resize', createGrid);
  }, [createGrid]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    isMouseMovingRef.current = true;
  }, []);

  // Separate RAF loop for mouse interactions
  const updateMouseEffects = useCallback(() => {
    
    const { x: mouseX, y: mouseY } = mousePositionRef.current;
    const elements = gridElementsRef.current;
    const visibleElements = visibleElementsRef.current;
    const effectRadiusSquared = effectRadius * effectRadius;
    
    visibleElements.clear();

    // First pass: find visible elements
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const elementX = parseInt(element.getAttribute('data-x') || '0');
      const elementY = parseInt(element.getAttribute('data-y') || '0');
      
      const dx = mouseX - elementX;
      const dy = mouseY - elementY;
      const distanceSquared = dx * dx + dy * dy;
      
      if (distanceSquared <= effectRadiusSquared) {
        visibleElements.add(i);
      }
    }

    // Second pass: update only visible elements
    visibleElements.forEach(i => {
      const element = elements[i];
      const elementX = parseInt(element.getAttribute('data-x') || '0');
      const elementY = parseInt(element.getAttribute('data-y') || '0');
      
      const dx = mouseX - elementX;
      const dy = mouseY - elementY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const intensity = (effectRadius - distance) / effectRadius;
      
      const dot = element.children[0] as HTMLElement;
      const lines = [
        element.children[1] as HTMLElement,
        element.children[2] as HTMLElement,
        element.children[3] as HTMLElement,
        element.children[4] as HTMLElement
      ];

      // Batch DOM updates
      const updates: (() => void)[] = [];
      
      if (intensity > 0.1) {
        const newClass = `absolute rounded-full ${hoverColor}`;
        if (dot.className !== newClass) {
          updates.push(() => {
            dot.className = newClass;
            lines.forEach(line => line.className = newClass);
          });
        }
      } else {
        const newClass = `absolute rounded-full ${color}`;
        if (dot.className !== newClass) {
          updates.push(() => {
            dot.className = newClass;
            lines.forEach(line => line.className = newClass);
          });
        }
      }

      if (intensity > 0.01) {
        const currentLength = minLineLength + (intensity * (maxLineLength - minLineLength));
        const halfLength = (currentLength - gapSize) / 2;
        
        updates.push(() => {
          dot.style.opacity = '0';
          lines[0].style.cssText = `position:absolute;border-radius:9999px;left:${-lineThickness/2}px;opacity:1;height:${halfLength}px;top:${-halfLength - gapSize / 2}px;width:${lineThickness}px;will-change:opacity,width,height,top,left`;
          lines[1].style.cssText = `position:absolute;border-radius:9999px;left:${-lineThickness/2}px;opacity:1;height:${halfLength}px;top:${gapSize/2}px;width:${lineThickness}px;will-change:opacity,width,height,top,left`;
          lines[2].style.cssText = `position:absolute;border-radius:9999px;top:${-lineThickness/2}px;opacity:1;width:${halfLength}px;left:${-halfLength - gapSize / 2}px;height:${lineThickness}px;will-change:opacity,width,height,top,left`;
          lines[3].style.cssText = `position:absolute;border-radius:9999px;top:${-lineThickness/2}px;opacity:1;width:${halfLength}px;left:${gapSize/2}px;height:${lineThickness}px;will-change:opacity,width,height,top,left`;
        });
      } else {
        updates.push(() => {
          dot.style.opacity = '1';
          lines.forEach(line => line.style.opacity = '0');
        });
      }
      
      updates.push(() => {
        element.style.opacity = (0.4 + intensity * 0.6).toString();
      });

      // Execute all updates at once
      updates.forEach(update => update());
    });

    // Reset elements outside effect radius
    for (let i = 0; i < elements.length; i++) {
      if (!visibleElements.has(i)) {
        const element = elements[i];
        if (element.style.opacity !== '0.4') {
          element.style.opacity = '0.4';
          const dot = element.children[0] as HTMLElement;
          if (dot.style.opacity !== '1') {
            dot.style.opacity = '1';
            for (let j = 1; j < element.children.length; j++) {
              (element.children[j] as HTMLElement).style.opacity = '0';
            }
          }
        }
      }
    }
  }, [effectRadius, minLineLength, maxLineLength, gapSize, color, hoverColor, lineThickness]);

  useEffect(() => {
    let rafId: number;
    let lastWaveTime = 0;
    let scrollTimeout: NodeJS.Timeout;
    let themeTimeout: NodeJS.Timeout;
    
    // Handle scroll events to reduce performance during scrolling
    const handleScroll = () => {
      scrollingRef.current = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollingRef.current = false;
      }, 150);
    };

    // Handle theme changes to reduce performance during theme transitions
    const handleThemeChange = () => {
      scrollingRef.current = true; // Use same flag to disable mouse effects
      clearTimeout(themeTimeout);
      themeTimeout = setTimeout(() => {
        scrollingRef.current = false;
      }, 500); // Match theme transition duration
    };
    
    // Intersection observer for visibility
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.1 });
    
    if (gridRef.current) {
      observer.observe(gridRef.current);
    }
    
    const combinedAnimationLoop = (currentTime: number) => {
      if (isVisibleRef.current) {
        // Only run mouse effects when not scrolling for performance
        if (!scrollingRef.current) {
          updateMouseEffects();
        }
        
        // Wave animation continues during scroll with throttling
        if (waveAmplitude > 0 && currentTime - lastWaveTime >= 33.33) { // 30fps for waves
          lastWaveTime = currentTime;
          const time = currentTime * 0.001 * waveSpeed;
          const elements = waveElementsRef.current;
          
          for (let i = 0; i < elements.length; i++) {
            const { element, baseX } = elements[i];
            const waveOffset = Math.sin((baseX * 0.01) + time) * waveAmplitude;
            element.style.transform = `translateY(${waveOffset}px)`;
          }
        }
      }
      
      rafId = requestAnimationFrame(combinedAnimationLoop);
    };
    
    rafId = requestAnimationFrame(combinedAnimationLoop);
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Listen for theme changes
    const themeToggle = document.querySelector('[data-theme-toggle]') || document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', handleThemeChange);
    }

    // Alternative: listen for theme class changes on document/html
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          handleThemeChange();
        }
      });
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
      clearTimeout(themeTimeout);
      observer.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      if (themeToggle) {
        themeToggle.removeEventListener('click', handleThemeChange);
      }
    };
  }, [handleMouseMove, updateMouseEffects, waveAmplitude, waveSpeed]);

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        willChange: 'transform',
        contain: 'strict',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        isolation: 'isolate'
      }}
    />
  );
}
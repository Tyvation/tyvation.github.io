'use client';
import { useEffect, useState } from 'react';
import FaultyTerminal, { FaultyTerminalProps } from './FaultyTerminal';

type ThemedFaultyTerminalProps = Omit<FaultyTerminalProps, 'tint' | 'backgroundColor'>;

export default function ThemedFaultyTerminal(props: ThemedFaultyTerminalProps) {
  const [colors, setColors] = useState({
    tint: '#ffffff',
    backgroundColor: '#000000'
  });

  useEffect(() => {
    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      const foreground = style.getPropertyValue('--background').trim();
      const background = style.getPropertyValue('--secondary').trim();
      
      setColors({
        tint: foreground || '#284828',
        backgroundColor: background || '#d1a019'
      });
    };

    updateColors();
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <FaultyTerminal
      {...props}
      tint={colors.tint}
      backgroundColor={colors.backgroundColor}
    />
  );
}
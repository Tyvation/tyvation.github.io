import React from 'react';

export const parseMarkdown = (text: string): React.ReactNode => {
  if (!text) return text;
  
  // Split by **bold** markers while preserving the markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    // Check if this part is bold (wrapped in **)
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2); // Remove ** markers
      return (
        <span key={index} className="text-accent transition-colors duration-500">
          {boldText}
        </span>
      );
    }
    
    // Regular text
    return part;
  });
};
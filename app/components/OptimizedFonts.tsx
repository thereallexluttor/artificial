"use client";

import { useEffect } from 'react';

export default function OptimizedFonts() {
  useEffect(() => {
    // Lazy load Google Fonts after initial render
    const loadFonts = () => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://fonts.googleapis.com';
      document.head.appendChild(link);

      const link2 = document.createElement('link');
      link2.rel = 'preconnect';
      link2.href = 'https://fonts.gstatic.com';
      link2.crossOrigin = 'anonymous';
      document.head.appendChild(link2);

      const link3 = document.createElement('link');
      link3.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Oswald:wght@400;700&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;700&display=swap';
      link3.rel = 'stylesheet';
      document.head.appendChild(link3);

      const link4 = document.createElement('link');
      link4.href = 'https://fonts.cdnfonts.com/css/helvetica-neue-9';
      link4.rel = 'stylesheet';
      document.head.appendChild(link4);
    };

    // Load fonts after a short delay to not block initial render
    const timer = setTimeout(loadFonts, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
} 
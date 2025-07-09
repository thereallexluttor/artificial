"use client";

import { useRef, useLayoutEffect, useState, RefObject, ReactNode, useCallback, useMemo, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import "./ScrollVelocity.css";

// Performance monitoring hook
const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const updateFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      requestAnimationFrame(updateFPS);
    };
    
    requestAnimationFrame(updateFPS);
  }, []);

  return fps;
};

// Optimized width hook with debouncing
function useElementWidth(ref: { current: HTMLElement | null }) {
  const [width, setWidth] = useState(0);
  const resizeTimeout = useRef<NodeJS.Timeout>();

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        const newWidth = ref.current.offsetWidth;
        if (newWidth !== width) {
          setWidth(newWidth);
        }
      }
    }

    const debouncedUpdate = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(updateWidth, 16); // ~60fps
    };

    updateWidth();
    window.addEventListener("resize", debouncedUpdate, { passive: true });
    
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, [ref, width]);

  return width;
}

// Optimized velocity calculation with adaptive performance
const useAdaptiveVelocity = (baseVelocity: number, fps: number) => {
  return useMemo(() => {
    // Adjust velocity based on performance
    const performanceFactor = Math.min(fps / 60, 1.5);
    return baseVelocity * performanceFactor;
  }, [baseVelocity, fps]);
};

interface VelocityTextProps {
  children: ReactNode;
  baseVelocity?: number;
  scrollContainerRef?: RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  enableGPU?: boolean;
  adaptivePerformance?: boolean;
}

function VelocityText({
  children,
  baseVelocity = 100,
  scrollContainerRef,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle,
  scrollerStyle,
  enableGPU = true,
  adaptivePerformance = true,
}: VelocityTextProps) {
  const fps = usePerformanceMonitor();
  const adaptiveVelocity = useAdaptiveVelocity(baseVelocity, fps);
  
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  
  // Optimized spring with adaptive damping
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: adaptivePerformance ? Math.max(damping, fps / 2) : damping,
    stiffness: adaptivePerformance ? Math.min(stiffness, fps * 8) : stiffness,
  });
  
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 5],
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const lastDelta = useRef(0);
  const frameSkip = useRef(0);

  // Optimized wrap function with caching
  const wrap = useCallback((min: number, max: number, v: number) => {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }, []);

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef(1);
  const lastVelocityFactor = useRef(0);
  
  // Optimized animation frame with adaptive frame skipping
  useAnimationFrame((t, delta) => {
    // Adaptive frame skipping for performance
    frameSkip.current++;
    if (adaptivePerformance && fps < 30 && frameSkip.current % 2 === 0) {
      return;
    }
    
    // Smooth delta calculation
    const smoothDelta = delta * 0.8 + lastDelta.current * 0.2;
    lastDelta.current = smoothDelta;
    
    let moveBy = directionFactor.current * adaptiveVelocity * (smoothDelta / 1000);
    
    // Optimized direction change detection
    const currentVelocityFactor = velocityFactor.get();
    if (Math.abs(currentVelocityFactor - lastVelocityFactor.current) > 0.1) {
      if (currentVelocityFactor < 0) {
        directionFactor.current = -1;
      } else if (currentVelocityFactor > 0) {
        directionFactor.current = 1;
      }
      lastVelocityFactor.current = currentVelocityFactor;
    }

    moveBy += directionFactor.current * moveBy * currentVelocityFactor;
    baseX.set(baseX.get() + moveBy);
  });

  // Optimized span generation with memoization
  const spans = useMemo(() => {
    const result = [];
    for (let i = 0; i < numCopies; i++) {
      result.push(
        <span 
          className={className} 
          key={i} 
          ref={i === 0 ? copyRef : null}
          style={enableGPU ? { 
            willChange: 'transform',
            transform: 'translateZ(0)' // Force GPU acceleration
          } : undefined}
        >
          {children}
        </span>
      );
    }
    return result;
  }, [numCopies, className, children, enableGPU]);

  return (
    <div 
      className={parallaxClassName} 
      style={{
        ...parallaxStyle,
        ...(enableGPU && { 
          willChange: 'transform',
          transform: 'translateZ(0)'
        })
      }}
    >
      <motion.div
        className={scrollerClassName}
        style={{ 
          x, 
          ...scrollerStyle,
          ...(enableGPU && { 
            willChange: 'transform',
            transform: 'translateZ(0)'
          })
        }}
      >
        {spans}
      </motion.div>
    </div>
  );
}

interface ScrollVelocityProps {
    scrollContainerRef?: RefObject<HTMLElement>;
    texts?: { text: string; className?: string }[];
    velocity?: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: { input: number[]; output: number[] };
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: React.CSSProperties;
    scrollerStyle?: React.CSSProperties;
    singleLine?: boolean;
    enableGPU?: boolean;
    adaptivePerformance?: boolean;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle,
  scrollerStyle,
  singleLine = false,
  enableGPU = true,
  adaptivePerformance = true,
}: ScrollVelocityProps) => {
  
  // Optimized combined content for single line
  const combinedContent = useMemo(() => {
    if (!singleLine) return null;
    
    return (
      <>
        {texts.map((item, index) => (
          <span 
            key={`${item.text}-${index}`} 
            className={item.className}
            style={enableGPU ? { 
              willChange: 'transform',
              transform: 'translateZ(0)'
            } : undefined}
          >
            {item.text}
            {index < texts.length - 1 && (
              <span className="mx-4 text-gray-500 opacity-60">•</span>
            )}
          </span>
        ))}
      </>
    );
  }, [texts, singleLine, enableGPU]);

  if (singleLine) {
    return (
      <section style={enableGPU ? { 
        willChange: 'transform',
        transform: 'translateZ(0)'
      } : undefined}>
        <VelocityText
          className={className}
          baseVelocity={velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          enableGPU={enableGPU}
          adaptivePerformance={adaptivePerformance}
        >
          {combinedContent}&nbsp;
        </VelocityText>
      </section>
    );
  }

  return (
    <section style={enableGPU ? { 
      willChange: 'transform',
      transform: 'translateZ(0)'
    } : undefined}>
      {texts.map((item, index) => (
        <VelocityText
          key={`${item.text}-${index}`}
          className={item.className || className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          enableGPU={enableGPU}
          adaptivePerformance={adaptivePerformance}
        >
          {item.text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity; 
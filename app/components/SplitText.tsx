'use client';

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, GSAPSplitText);
}

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const animationCompletedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animationCompletedRef.current || typeof window === 'undefined') return;
    
    // Skip animations on mobile to prevent reloading
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      animationCompletedRef.current = true;
      return;
    }

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    const splitter = new GSAPSplitText(el, {
      type: splitType,
      absolute: absoluteLines,
      linesClass: "split-line",
    });

    let targets: Element[];
    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "words, chars":
        targets = [...splitter.words, ...splitter.chars];
        break;
      default:
        targets = splitter.chars;
    }

    targets.forEach((t, index) => {
      (t as HTMLElement).style.willChange = "transform, opacity";
      (t as HTMLElement).style.setProperty('--char-index', index.toString());
      
      // Preserve gradient classes by copying them to each character
      if (splitType === "chars") {
        // Check if parent has gradient classes
        const parentElement = el.parentElement;
        if (parentElement && parentElement.className.includes("bg-clip-text")) {
          const gradientClasses = parentElement.className.split(" ").filter(cls => 
            cls.includes("bg-") || cls.includes("text-transparent") || cls.includes("bg-clip-text")
          );
          if (gradientClasses.length > 0) {
            (t as HTMLElement).className = gradientClasses.join(" ");
          }
        }
        // Also check the element itself
        else if (el.className.includes("bg-clip-text")) {
          const gradientClasses = el.className.split(" ").filter(cls => 
            cls.includes("bg-") || cls.includes("text-transparent") || cls.includes("bg-clip-text")
          );
          if (gradientClasses.length > 0) {
            (t as HTMLElement).className = gradientClasses.join(" ");
          }
        }
        
        // Apply fill animation classes
        if (el.className.includes("animated-fill") || (parentElement && parentElement.className.includes("animated-fill"))) {
          (t as HTMLElement).classList.add("animated-fill", "char");
        }
      }
    });

    const startPct = (1 - threshold) * 100;
    const m = /^(-?\d+)px$/.exec(rootMargin);
    const raw = m ? parseInt(m[1], 10) : 0;
    const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
    const start = `top ${startPct}%${sign}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
      },
      smoothChildTiming: true,
      onComplete: () => {
        animationCompletedRef.current = true;
        gsap.set(targets, {
          ...to,
          clearProps: "willChange",
          immediateRender: true,
        });
        onLetterAnimationComplete?.();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      if (!animationCompletedRef.current) {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        gsap.killTweensOf(targets);
        splitter.revert();
      }
    };
  }, []);

  return (
    <span
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {text}
    </span>
  );
};

export default SplitText; 
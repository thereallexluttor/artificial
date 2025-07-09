import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string; // GSAP ease
}

type SetterFn = (v: number | string) => void;

// Optimized image component with GIF handling
const OptimizedImage: React.FC<{ src: string; alt: string; onLoad?: () => void }> = ({ 
  src, 
  alt, 
  onLoad 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGif, setIsGif] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Detect if image is GIF
  useEffect(() => {
    if (src.toLowerCase().endsWith('.gif')) {
      setIsGif(true);
    }
  }, [src]);

  // Standard loading for all images
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  return (
    <div className={`chroma-img-container ${isLoaded ? 'loaded' : 'loading'}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        className={`chroma-img ${isGif ? 'gif-image' : ''} ${isLoaded ? 'loaded' : ''}`}
        style={{
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
};

// Flip Card Component
const FlipCard: React.FC<{
  item: ChromaItem;
  index: number;
  onImageLoad: () => void;
  onCardMove: React.MouseEventHandler<HTMLElement>;
  onCardClick: () => void;
}> = ({ item, index, onImageLoad, onCardMove, onCardClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsFlipped(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={onCardMove}
      onClick={onCardClick}
      style={{
        '--card-border': item.borderColor || "transparent",
        '--card-gradient': item.gradient,
        cursor: item.url ? "pointer" : "default",
      } as React.CSSProperties}
    >
      {/* Front of card */}
      <div className="flip-card-front">
        <div className="chroma-img-wrapper">
          <OptimizedImage 
            src={item.image} 
            alt={item.title} 
            onLoad={onImageLoad}
          />
        </div>
        <footer className="chroma-info">
          <h3 className="name">{item.title}</h3>
          <p className="role">{item.subtitle}</p>
          {item.handle && <span className="handle">{item.handle}</span>}
          {item.location && <span className="location">{item.location}</span>}
        </footer>
      </div>

      {/* Back of card */}
      <div className="flip-card-back">
        <div className="back-content" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '20px',
          textAlign: 'justify'
        }}>
          <div>
            <div className="back-title" style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px', opacity: 0.95 }}>
              {item.title === "Branding Estratégico" && "MARCA INOLVIDABLE"}
              {item.title === "UX/UI Diseño" && "CONVERSIÓN GARANTIZADA"}
              {item.title === "Software a Medida" && "AUTOMATIZACIÓN TOTAL"}
              {item.title === "Inteligencia de Datos" && "VENTAJA COMPETITIVA"}
              {item.title === "Growth Marketing" && "CRECIMIENTO EXPLOSIVO"}
              {item.title === "Consultoría Digital" && "TRANSFORMACIÓN DIGITAL"}
            </div>
            <div className="back-description" style={{ fontSize: '13px', lineHeight: '1.4', opacity: 0.9, marginBottom: '16px' }}>
              {item.title === "Branding Estratégico" && "Tu marca será recordada. Creamos identidades que generan conexión emocional y posicionamiento de mercado que convierte."}
              {item.title === "UX/UI Diseño" && "Interfaces que venden. Diseñamos experiencias que enamoran usuarios y multiplican tus conversiones automáticamente."}
              {item.title === "Software a Medida" && "Software que escala tu negocio. Automatizamos procesos y optimizamos operaciones para maximizar tu rentabilidad."}
              {item.title === "Inteligencia de Datos" && "Datos que generan dinero. Transformamos información en decisiones que te dan ventaja competitiva inmediata."}
              {item.title === "Growth Marketing" && "Crecimiento exponencial. Estrategias que escalan tu negocio y multiplican tu ROI con cada campaña."}
              {item.title === "Consultoría Digital" && "Tu éxito digital garantizado. Identificamos oportunidades y creamos la ruta exacta para tu transformación."}
            </div>
          </div>
          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <span style={{ 
              textDecoration: 'underline', 
              fontSize: '12px', 
              cursor: 'pointer',
              opacity: 0.8,
              transition: 'opacity 0.2s ease'
            }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
              saber más
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const [isGridReady, setIsGridReady] = useState(true);

  const demo: ChromaItem[] = [
    {
      image: "https://i.pravatar.cc/300?img=8",
      title: "Alex Rivera",
      subtitle: "Full Stack Developer",
      handle: "@alexrivera",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg, #4F46E5, #000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=11",
      title: "Jordan Chen",
      subtitle: "DevOps Engineer",
      handle: "@jordanchen",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg, #10B981, #000)",
      url: "https://linkedin.com/in/",
    },
    {
      image: "https://i.pravatar.cc/300?img=3",
      title: "Morgan Blake",
      subtitle: "UI/UX Designer",
      handle: "@morganblake",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: "https://dribbble.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=16",
      title: "Casey Park",
      subtitle: "Data Scientist",
      handle: "@caseypark",
      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg, #EF4444, #000)",
      url: "https://kaggle.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=25",
      title: "Sam Kim",
      subtitle: "Mobile Developer",
      handle: "@thesamkim",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg, #8B5CF6, #000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=60",
      title: "Tyler Rodriguez",
      subtitle: "Cloud Architect",
      handle: "@tylerrod",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(135deg, #06B6D4, #000)",
      url: "https://aws.amazon.com/",
    },
  ];
  
  const data = useMemo(() => items?.length ? items : demo, [items]);

  // Simple image loading - no tracking needed
  const handleImageLoad = useCallback(() => {
    // Do nothing - images load naturally
  }, []);

  // Grid is always ready
  useEffect(() => {
    setIsGridReady(true);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    
    setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
    setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = useCallback((x: number, y: number) => {
    if (!isGridReady) return; // Only allow interactions when grid is ready
    
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  }, [damping, ease, isGridReady]);

  const handleMove = useCallback((e: React.PointerEvent) => {
    if (!isGridReady) return;
    
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  }, [moveTo, isGridReady]);

  const handleLeave = useCallback(() => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  }, [fadeOut]);

  const handleCardClick = useCallback((url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);

  const handleCardMove: React.MouseEventHandler<HTMLElement> = useCallback((e) => {
    if (!isGridReady) return;
    
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, [isGridReady]);

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className} ${isGridReady ? 'ready' : 'loading'}`}
      style={
        {
          "--r": `${radius}px`,
          "--cols": columns,
          "--rows": rows,
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((item, index) => (
        <FlipCard
          key={index}
          item={item}
          index={index}
          onImageLoad={handleImageLoad}
          onCardMove={handleCardMove}
          onCardClick={() => handleCardClick(item.url)}
        />
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
      
      {/* No loading indicator - simple and clean */}
    </div>
  );
};

export default ChromaGrid; 
"use client";

import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo, memo, useCallback, lazy, Suspense } from "react"
import Silk from './Silk';
import ShapeBlur from './ShapeBlur';
// Lazy load heavy components
const SplineScene = lazy(() => import('./components/SplineScene'));
const ChromaGrid = lazy(() => import("@/components/ui/chroma-grid/ChromaGrid").then(module => ({ default: module.ChromaGrid })));
import ScrollVelocity from "./components/ScrollVelocity";
import { Sparkles } from "lucide-react";
import Beams from "./components/Beams";
import OptimizedFonts from "./components/OptimizedFonts";
import "@/components/ui/chroma-grid/ChromaGrid.css";

// Throttle function for performance
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  return function (...args: any[]) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Memoize the Beams component
const MemoizedBeams = memo(Beams);

// Optimized static data with memoization
const chromaItems = [
  {
    image: "/gifs/branding.gif",
    title: "Branding Estratégico",
    subtitle: "Branding Estratégico con IA",
    handle: "@artificial",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "#"
  },
  {
    image: "/gifs/uiux.gif",
    title: "UX/UI Diseño",
    subtitle: "UX/UI & Diseño de Producto",
    handle: "@artificial",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "#"
  },
  {
    image: "/gifs/software.gif",
    title: "Software a Medida",
    subtitle: "Software a Medida & Automatización",
    handle: "@artificial",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
    url: "#"
  },
  {
    image: "/gifs/inteligencia.gif",
    title: "Inteligencia de Datos",
    subtitle: "Inteligencia de Datos & Analítica Predictiva",
    handle: "@artificial",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg, #EF4444, #000)",
    url: "#"
  },
  {
    image: "/gifs/marketing.gif",
    title: "Growth Marketing",
    subtitle: "Growth & Performance Marketing",
    handle: "@artificial",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "#"
  },
  {
    image: "/gifs/consultaria.gif",
    title: "Consultoría Digital",
    subtitle: "Consultoría Digital & Roadmap de Innovación",
    handle: "@artificial",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)",
    url: "#"
  },
];

// Services data with stable reference
const services = [
  { text: "Fábricas pequeñas", className: "font-oswald" },
  { text: "Talleres de producción", className: "font-playfair" },
  { text: "Clínicas estéticas", className: "font-lato" },
  { text: "Consultorios odontológicos", className: "font-montserrat" },
  { text: "Spas", className: "font-roboto" },
  { text: "Centros de uñas", className: "font-oswald" },
  { text: "Centros de cejas", className: "font-playfair" },
  { text: "Estudios jurídicos", className: "font-lato" },
  { text: "Empresas de ingeniería", className: "font-montserrat" },
  { text: "Peluquerías", className: "font-roboto" },
  { text: "Barberías", className: "font-oswald" },
  { text: "Clínicas veterinarias", className: "font-playfair" },
  { text: "Tiendas de ropa", className: "font-lato" },
  { text: "Tiendas de zapatos", className: "font-montserrat" },
  { text: "Tiendas de muebles", className: "font-roboto" },
  { text: "Licoreras", className: "font-oswald" },
  { text: "Ópticas", className: "font-playfair" },
  { text: "Tiendas de accesorios", className: "font-lato" },
  { text: "Negocios e-commerce", className: "font-montserrat" },
];

// Navigation items with stable reference
const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Ventajas", href: "#ventajas" },
  { label: "Nuestra historia", href: "#historia" },
];

// Create a memoized services section component
const ServicesSection = memo(({ services1, services2, services3, services4 }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChromaActive, setIsChromaActive] = useState(false);
  const [isBeamsActive, setIsBeamsActive] = useState(false);

  // Optimized Beams with reduced complexity and GPU usage
  const memoizedBeams = useMemo(() => (
    <MemoizedBeams
      beamWidth={1.5}        // Reduced from 2
      beamHeight={12}        // Reduced from 15
      beamNumber={8}         // Reduced from 12
      lightColor="#ffffff"
      speed={1.5}            // Reduced from 2
      noiseIntensity={1.2}   // Reduced from 1.75
      scale={0.15}           // Reduced from 0.2
      rotation={30}
    />
  ), []);

  // Combine services for the marquee effect with stable references
  const firstHalf = useMemo(() => [...services1, ...services2], [services1, services2]);
  const secondHalf = useMemo(() => [...services3, ...services4], [services3, services4]);

  // Optimized ChromaGrid props with reduced GPU load
  const optimizedChromaProps = useMemo(() => ({
    items: chromaItems,
    radius: 200,           // Reduced from 220
    damping: 0.5,          // Increased for smoother animation
    fadeOut: 0.7,          // Increased from 0.6
    ease: "power2.out"     // Less intensive than power3.out
  }), []);

  // Progressive loading with performance budgets
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Stagger heavy component loading to prevent frame drops
          const activateBeams = setTimeout(() => setIsBeamsActive(true), 100);
          const activateChroma = setTimeout(() => setIsChromaActive(true), 300);
          
          observer.disconnect();
          
          return () => {
            clearTimeout(activateBeams);
            clearTimeout(activateChroma);
          };
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading earlier
      }
    );

    const section = document.getElementById('servicios');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="servicios" 
      className="h-auto min-h-screen pt-16 pb-24 bg-black flex flex-col justify-center items-center text-white overflow-hidden relative"
      style={{ willChange: 'auto' }} // Optimize for GPU compositing
    >
      {/* Beams Background - Progressive Loading */}
      <div className="absolute inset-0 z-0" style={{ willChange: isBeamsActive ? 'transform' : 'auto' }}>
        {isBeamsActive && memoizedBeams}
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center px-5 space-y-10 md:space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-2xl font-bold mb-4 font-['Helvetica_Neue'] font-sans">
            Soluciones a la medida de tu negocio
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            Del branding a la data, convertimos tus desafíos en ventajas competitivas. Hacemos que tu negocio destaque, no solo que funcione.
          </p>
        </div>

        {/* Services Cards with Progressive Loading */}
        <div 
          className="flex justify-center" 
          style={{ 
            height: '548px', 
            width: '700px', 
            position: 'relative', 
            borderRadius: '20px', 
            overflow: 'hidden',
            willChange: isChromaActive ? 'transform' : 'auto' // GPU optimization hint
          }}
        >
          {isVisible ? (
            isChromaActive ? (
              <Suspense fallback={<div className="w-full h-full bg-gray-900 rounded-[20px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
              </div>}>
                <ChromaGrid {...optimizedChromaProps} />
              </Suspense>
            ) : (
              <div className="w-full h-full bg-gray-900 rounded-[20px] flex items-center justify-center">
                <div className="animate-pulse rounded-full h-16 w-16 bg-gray-700"></div>
                <span className="ml-4 text-gray-400">Cargando experiencias...</span>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-gray-900 rounded-[20px] flex items-center justify-center">
              <div className="animate-pulse rounded-full h-32 w-32 bg-gray-700"></div>
            </div>
          )}
        </div>

        {/* Industries Marquee - Only load when visible */}
        {isVisible && (
          <div className="w-full max-w-full text-center -mt-20">
              <h3 className="text-2xl md:text-2xl font-bold text-white mb-0">Trabajamos con una amplia gama de industrias</h3>
              <div 
                className="relative h-48 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
                style={{ willChange: 'transform' }} // Optimize scroll animations
              >
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full flex flex-col gap-y-6">
                          <ScrollVelocity 
                            texts={firstHalf} 
                            velocity={-20} // Reduced from -25 for better performance
                            singleLine={true} 
                            className="text-2xl md:text-3xl text-gray-400 font-light opacity-80" 
                          />
                          <ScrollVelocity 
                            texts={secondHalf} 
                            velocity={20} // Reduced from 25 for better performance
                            singleLine={true} 
                            className="text-2xl md:text-3xl text-gray-400 font-light opacity-80" 
                          />
                      </div>
                  </div>
              </div>
          </div>
        )}
      </div>
    </section>
  );
});
ServicesSection.displayName = 'ServicesSection';

// Create a memoized hero section component
const HeroSection = memo(() => {
  const [showSpline, setShowSpline] = useState(false);

  const memoizedSilk = useMemo(() => (
    <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
  ), []);

  // Load Spline after initial render for better FCP
  useEffect(() => {
    const timer = setTimeout(() => setShowSpline(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="inicio" className="min-h-screen h-[100vh] relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0">
        {memoizedSilk}
      </div>
      
      {/* Hero Graphic with Lazy Loading */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {showSpline ? (
          <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
            <SplineScene />
          </Suspense>
        ) : (
          <div className="w-full h-full bg-transparent" />
        )}
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-5 relative z-10">
        {/* Hero Text */}
        <div className="max-w-6xl mx-auto">
          <h2 className="font-extrabold mb-4 sm:mb-8 text-3xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-full break-words">
            Tu negocio merece destacar.<br />
            No solo funcionar.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Impulsa tu productividad, domina tus datos y construye productos que te posicionen como único, no genérico.
          </p>
        </div>
      </main>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Memoize services chunks to prevent recalculation
  const servicesChunks = useMemo(() => {
    const chunkSize = Math.ceil(services.length / 4);
    return {
      services1: services.slice(0, chunkSize),
      services2: services.slice(chunkSize, chunkSize * 2),
      services3: services.slice(chunkSize * 2, chunkSize * 3),
      services4: services.slice(chunkSize * 3),
    };
  }, []);

  // Optimized scroll handler with Intersection Observer
  useEffect(() => {
    const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean) as Element[];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex(section => section === entry.target);
            if (index !== -1 && index !== activeIndex) {
              setActiveIndex(index);
            }
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [activeIndex]);

  // Optimized header scroll effect with throttling
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = throttle(() => {
        if (window.scrollY > 10) {
            header.classList.add('bg-black/20', 'backdrop-blur-sm');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-black/20', 'backdrop-blur-sm');
            header.classList.add('bg-transparent');
        }
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized scroll to section function
  const scrollToSection = useCallback((href: string, index: number) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const extraMargin = 50;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight + extraMargin;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  }, []);

  return (
    <div className="bg-black text-white font-sans">
      <OptimizedFonts />
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-4">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-4 lg:px-12 relative">
            {/* Simple Navigation with Indicator */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <ul className="flex items-center justify-start gap-4 sm:gap-8">
                  {navItems.map((item, index) => (
                    <li key={index} className="relative flex flex-col items-center">
                      <button
                        onClick={() => scrollToSection(item.href, index)}
                        className={`text-xs font-bold font-sans transition-colors duration-200 ${
                          activeIndex === index ? "text-white" : "text-gray-400 hover:text-gray-200"
                        }`}
                      >
                        {item.label}
                      </button>
                      {activeIndex === index && (
                        <div className="absolute -bottom-2 w-10 h-0.5 bg-white rounded-[4px] animate-indicator shadow-[0_0_8px_2px_rgba(255,255,255,0.3)] sm:w-12" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Logo */}
            <div className="hidden sm:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-xl lg:text-2xl font-bold">art_ificial</h1>
              <p className="text-xs text-gray-400">Experiences made by humans</p>
            </div>
          </nav>

          {/* Mobile Logo */}
          <div className="sm:hidden text-center px-4">
            <h1 className="text-lg font-bold">art__ificial</h1>
            <p className="text-xs text-gray-400">Experiences made by humans</p>
          </div>
        </header>
      
      <HeroSection />
      
      <ServicesSection {...servicesChunks} />
    </div>
  )
}

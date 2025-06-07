"use client";

import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo, memo } from "react"
import Silk from './Silk';
import ShapeBlur from './ShapeBlur';
import SplineScene from './components/SplineScene';
import ScrollVelocity from "./components/ScrollVelocity";
import { ChromaGrid } from "@/components/ui/chroma-grid/ChromaGrid";
import { Sparkles } from "lucide-react";
import Beams from "./components/Beams";
import "@/components/ui/chroma-grid/ChromaGrid.css";

// Memoize the Beams component
const MemoizedBeams = memo(Beams);

// Memoize the SplineScene component
const MemoizedSplineScene = memo(SplineScene);

const chromaItems = [
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Branding Estratégico",
    subtitle: "Branding Estratégico con IA",
    handle: "@artificial",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "UX/UI Diseño",
    subtitle: "UX/UI & Diseño de Producto",
    handle: "@artificial",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1556740738-b6a63e2775df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Software a Medida",
    subtitle: "Software a Medida & Automatización",
    handle: "@artificial",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
    url: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Inteligencia de Datos",
    subtitle: "Inteligencia de Datos & Analítica Predictiva",
    handle: "@artificial",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg, #EF4444, #000)",
    url: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Growth Marketing",
    subtitle: "Growth & Performance Marketing",
    handle: "@artificial",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1600880292210-f7615951a99a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Consultoría Digital",
    subtitle: "Consultoría Digital & Roadmap de Innovación",
    handle: "@artificial",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)",
    url: "#"
  },
];

// Create a memoized services section component
const ServicesSection = memo(({ services1, services2, services3, services4, defaultCards }: any) => {
  const memoizedBeams = useMemo(() => (
    <MemoizedBeams
      beamWidth={2}
      beamHeight={15}
      beamNumber={12}
      lightColor="#ffffff"
      speed={2}
      noiseIntensity={1.75}
      scale={0.2}
      rotation={30}
    />
  ), []);

  // Combine services for the marquee effect
  const firstHalf = useMemo(() => [...services1, ...services2], [services1, services2]);
  const secondHalf = useMemo(() => [...services3, ...services4], [services3, services4]);

  return (
    <section id="servicios" className="h-auto min-h-screen pt-16 pb-24 bg-black flex flex-col justify-center items-center text-white overflow-hidden relative">
      {/* Beams Background */}
      <div className="absolute inset-0 z-0">
        {memoizedBeams}
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

        {/* Services Cards */}
        <div className="flex justify-center" style={{ height: '548px', width: '700px', position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
          <ChromaGrid 
            items={chromaItems}
            radius={220}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>

        {/* Industries Marquee */}
        <div className="w-full max-w-full text-center -mt-20">
            <h3 className="text-2xl md:text-2xl font-bold text-white mb-2">Trabajamos con una amplia gama de industrias</h3>
            <div className="relative h-64 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full flex flex-col gap-y-6">
                        <ScrollVelocity texts={firstHalf} velocity={-25} singleLine={true} className="text-2xl md:text-3xl text-gray-400 font-light opacity-80" />
                        <ScrollVelocity texts={secondHalf} velocity={25} singleLine={true} className="text-2xl md:text-3xl text-gray-400 font-light opacity-80" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
});
ServicesSection.displayName = 'ServicesSection';

// Create a memoized hero section component
const HeroSection = memo(() => {
  const memoizedSilk = useMemo(() => (
    <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
  ), []);

  const memoizedSplineScene = useMemo(() => (
    <MemoizedSplineScene />
  ), []);

  return (
    <section id="inicio" className="min-h-screen h-[100vh] relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0">
        {memoizedSilk}
      </div>
      
      {/* Hero Graphic */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {memoizedSplineScene}
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

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Ventajas", href: "#ventajas" },
  { label: "Nuestra historia", href: "#historia" },
  //{ label: "Cuéntanos tu problema", href: "#" },
];

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections
      const sections = navItems.map(item => document.querySelector(item.href));
      const validSections = sections.filter(section => section !== null) as Element[];

      // Find which section is in view
      const currentSection = validSections.findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection !== -1 && currentSection !== activeIndex) {
        setActiveIndex(currentSection);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('bg-black/20', 'backdrop-blur-sm');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-black/20', 'backdrop-blur-sm');
            header.classList.add('bg-transparent');
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string, index: number) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const extraMargin = 50; // Adding 32px (2rem) of extra margin
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight + extraMargin;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  };

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

  const chunkSize = Math.ceil(services.length / 4);
  const services1 = services.slice(0, chunkSize);
  const services2 = services.slice(chunkSize, chunkSize * 2);
  const services3 = services.slice(chunkSize * 2, chunkSize * 3);
  const services4 = services.slice(chunkSize * 3);

  return (
    <div className="bg-black text-white font-sans">
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
      
      <ServicesSection 
        services1={services1}
        services2={services2}
        services3={services3}
        services4={services4}
      />
    </div>
  )
}

"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Silk from './Silk';
import ShapeBlur from './ShapeBlur';
import SplineScene from './components/SplineScene';
import ScrollVelocity from "./components/ScrollVelocity";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Ventajas", href: "#" },
  { label: "Nuestra historia", href: "#" },
  //{ label: "Cuéntanos tu problema", href: "#" },
];

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

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
      <section id="inicio" className="h-screen relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 z-0">
          <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
        </div>
        
        <header className="relative z-50 pt-4">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-4 py-3 lg:px-12 lg:py-4 relative">
            {/* Simple Navigation with Indicator */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <ul className="flex items-center justify-start gap-4 sm:gap-8">
                  {navItems.map((item, index) => (
                    <li key={index} className="relative flex flex-col items-center">
                      <a
                        href={item.href}
                        className={`text-xs font-bold font-sans transition-colors duration-200 ${
                          activeIndex === index ? "text-white" : "text-gray-400 hover:text-gray-200"
                        }`}
                        onClick={(e) => {
                          // e.preventDefault(); // Allow navigation
                          setActiveIndex(index);
                        }}
                      >
                        {item.label}
                      </a>
                      {activeIndex === index && (
                        <div className="absolute -bottom-2 w-10 h-0.5 bg-white rounded-[4px] animate-indicator shadow-[0_0_8px_2px_rgba(255,255,255,0.3)] sm:w-12" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Logo */}
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 text-center">
              <h1 className="text-xl lg:text-2xl font-bold">art_ificial</h1>
              <p className="text-xs text-gray-400">Experiences made by humans</p>
            </div>
          </nav>

          {/* Mobile Logo */}
          <div className="sm:hidden text-center px-4 pb-4">
            <h1 className="text-lg font-bold">art__ificial</h1>
            <p className="text-xs text-gray-400">Experiences made by humans</p>
          </div>
        </header>

        {/* Hero Graphic */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <SplineScene />
        </div>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-end text-center px-5 pb-12 sm:pb-20 md:pb-24 lg:pb-32 relative z-10">
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
      
      <section id="servicios" className="h-screen bg-black flex flex-col justify-center items-center text-white overflow-hidden">
        <h2 className="text-4xl font-bold mb-16 text-center">Trabajamos con:</h2>
        <div className="w-full">
            <ScrollVelocity texts={services1} velocity={100} singleLine={true} className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-400" />
            <ScrollVelocity texts={services2} velocity={-100} singleLine={true} className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-400" />
            <ScrollVelocity texts={services3} velocity={100} singleLine={true} className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-400" />
            <ScrollVelocity texts={services4} velocity={-100} singleLine={true} className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-400" />
        </div>
        <div className="w-full text-left mt-32 px-5 md:px-12">
          <h3 className="text-4xl font-bold">Creamos soluciones personalizadas.</h3>
          <p className="text-2xl font-bold text-gray-300">Cada negocio es un universo y estamos para descifrarlo.</p>
        </div>
      </section>
    </div>
  )
}

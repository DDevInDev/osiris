import { ChevronDown } from "lucide-react";
import { lazy, Suspense } from "react";

interface HeroSectionProps {
  backgroundImage?: string;
}

const HeroLottie = lazy(() => import("./HeroLottie"));

const HeroSection = ({ backgroundImage }: HeroSectionProps) => {
  return (
    <section
      id="inicio"
      aria-label="Agencia de desarrollo web y marketing digital"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Glow radial effect */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16">

        {/* TEXT */}
        <div className="flex-1 text-center lg:text-left">

          <p className="text-indigo-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
            Agencia de Desarrollo Web y Marketing Digital
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
            Desarrollo Web, Marketing Digital y Automatización con IA
          </h1>

          <p className="text-white/70 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed mb-10">
            Creamos sitios web, aplicaciones y estrategias digitales diseñadas
            para atraer clientes, automatizar procesos y hacer crecer tu
            negocio en México y Estados Unidos. Nuestro enfoque combina
            desarrollo web profesional, diseño moderno y marketing digital
            orientado a resultados.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-3 px-7 py-3
              bg-gradient-to-r from-indigo-500 to-purple-600
              text-white rounded-full font-medium text-sm
              hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/30"
            >
              Ver servicios
              <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                <ChevronDown className="w-3 h-3" />
              </span>
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-7 py-3
              border border-white/20 text-white/80 rounded-full text-sm font-medium
              hover:border-indigo-500 hover:text-white transition-all duration-300"
            >
              Solicitar cotización
            </a>

          </div>

        </div>

        {/* LOTTIE SIDE */}
        <div className="flex-1 flex justify-center mt-16 lg:mt-0 relative">

          {/* Glass container */}
          <div className="relative p-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-pink-500/40 blur-2xl" />

            <div className="relative z-10 w-[300px] sm:w-[400px] lg:w-[450px]">
              <Suspense fallback={<div className="w-full h-[400px]" />}>
                <HeroLottie />
              </Suspense>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Imagen */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
          }}
        />

      </div>

      {/* Glow radial effect */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16">

        {/* TEXT */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-indigo-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
            Somos
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-white">
            Agencia de Marketing Digital
          </h1>

          <p className="text-white/70 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed mb-8">
            Impulsamos marcas a través de estrategias digitales enfocadas en
            crecimiento, automatización y posicionamiento digital.
          </p>

          <div className="flex justify-center lg:justify-start">
            <a
              href="#servicios"
              className="inline-flex items-center gap-3 px-6 py-3
              bg-gradient-to-r from-indigo-500 to-purple-600
              text-white rounded-full font-medium text-sm
              hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/30"
            >
              Conocer más
              <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                <ChevronDown className="w-3 h-3" />
              </span>
            </a>
          </div>
        </div>

        {/* LOTTIE SIDE */}
        <div className="flex-1 flex justify-center mt-16 lg:mt-0 relative">

          {/* Glass container */}
          <div className="relative p-6 rounded-full bg-white/1 border backdrop-blur-xl">

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50 blur-2xl" />

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

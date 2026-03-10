import {
  BarChart3,
  Cpu,
  Globe,
  Smartphone,
  Search,
  Bot,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web",
    description:
      "Creamos sitios web profesionales, rápidos y optimizados para SEO que ayudan a tu negocio a atraer clientes y crecer en internet.",
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description:
      "Desarrollamos aplicaciones móviles para iOS y Android que conectan tu negocio con tus clientes desde cualquier lugar.",
  },
  {
    icon: Search,
    title: "Marketing Digital y SEO",
    description:
      "Posicionamos tu empresa en Google mediante estrategias de SEO, publicidad digital y generación de leads.",
  },
  {
    icon: Cpu,
    title: "Desarrollo de Software",
    description:
      "Construimos sistemas y plataformas a la medida para automatizar procesos y optimizar la operación de tu empresa.",
  },
  {
    icon: Bot,
    title: "Automatización con IA",
    description:
      "Implementamos inteligencia artificial para automatizar tareas, mejorar atención al cliente y optimizar procesos.",
  },
  {
    icon: BarChart3,
    title: "Consultoría Tecnológica",
    description:
      "Te ayudamos a definir la mejor estrategia tecnológica para escalar tu negocio con soluciones digitales eficientes.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          <div>
            <p className="text-xl tracking-widest uppercase text-muted-foreground mb-3">
              Servicios
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Soluciones digitales para
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                hacer crecer tu negocio
              </span>
            </h2>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-2xl p-6 hover:border-accent/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-display font-semibold text-lg mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">

          <a
            href="#contacto"
            className="inline-flex items-center gap-3 px-8 py-4
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white rounded-full font-medium text-sm
            hover:scale-105 transition-all duration-300
            shadow-lg shadow-indigo-500/30"
          >
            Solicitar cotización
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-8 py-4
            border border-white/20 text-white/80
            rounded-full text-sm font-medium
            hover:border-indigo-500 hover:text-white
            transition-all duration-300"
          >
            Ver proyectos
          </a>

        </div>

      </div>

      <div className="dotted-line mt-24 mx-6" />
    </section>
  );
};

export default ServicesSection;
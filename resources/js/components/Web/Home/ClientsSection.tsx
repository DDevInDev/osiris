import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ArrowRight, TrendingUp, Target, Zap } from "lucide-react";

interface ClientCase {
  name: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    icon: "trending" | "target" | "zap";
  }[];
  tags: string[];
  photo: string;
  logo?: string;
  url?: string;
}

const clients: ClientCase[] = [
  {
    name: "Cantillo Property Services",
    industry: "Home Services",
    description:
      "Empresa de servicios residenciales en Texas enfocada en mantenimiento y reparación de propiedades.",
    challenge:
      "La empresa no tenía presencia digital ni generación constante de clientes desde internet.",
    solution:
      "Diseñamos un sitio web optimizado para SEO local, configuramos campañas de Google Ads y automatizamos la captura de leads mediante formularios inteligentes.",
    results: [
      { metric: "Leads Generados", value: "+180%", icon: "trending" },
      { metric: "Costo por Lead", value: "-35%", icon: "zap" },
      { metric: "Tráfico Web", value: "+220%", icon: "target" },
    ],
    tags: ["Desarrollo Web", "SEO Local", "Google Ads"],
    photo: "/images/projects/project1.jpg",
    url: "https://cantillopropertyservices.com",
  },
  {
    name: "UrbanFit",
    industry: "E-commerce",
    description:
      "Tienda online enfocada en productos fitness y bienestar.",
    challenge:
      "El sitio web tenía baja conversión y muchos usuarios abandonaban el carrito.",
    solution:
      "Rediseñamos completamente la tienda online, optimizamos la experiencia de compra y mejoramos el rendimiento del sitio.",
    results: [
      { metric: "Ventas Online", value: "+65%", icon: "trending" },
      { metric: "Conversión", value: "+48%", icon: "target" },
      { metric: "Velocidad Web", value: "-60%", icon: "zap" },
    ],
    tags: ["E-commerce", "UX/UI", "Optimización Web"],
    photo: "/images/projects/project2.jpg",
  },
  {
    name: "FinCore",
    industry: "Fintech",
    description:
      "Plataforma digital enfocada en soluciones financieras para pequeñas empresas.",
    challenge:
      "El negocio dependía completamente de publicidad pagada y no tenía tráfico orgánico.",
    solution:
      "Desarrollamos una plataforma optimizada para SEO, estrategia de contenidos y herramientas de automatización para captación de leads.",
    results: [
      { metric: "Tráfico Orgánico", value: "+310%", icon: "trending" },
      { metric: "Leads Calificados", value: "+90%", icon: "target" },
      { metric: "Costo Adquisición", value: "-45%", icon: "zap" },
    ],
    tags: ["SEO", "Desarrollo Web", "Automatización"],
    photo: "/images/projects/project3.jpg",
  },
];

const iconMap = {
  trending: TrendingUp,
  target: Target,
  zap: Zap,
};

const ClientsSection = () => {
  const [selectedClient, setSelectedClient] = useState<ClientCase | null>(null);

  useEffect(() => {
    if (selectedClient) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedClient]);

  return (
    <>
      <section id="clients" className="relative py-32 overflow-hidden">

        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />

        <div className="container mx-auto px-6 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <p className="text-sm tracking-[0.3em] uppercase text-indigo-400">
                Proyectos
              </p>
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Proyectos que generan{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                resultados reales
              </span>
            </h2>

            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Desarrollamos sitios web, aplicaciones y plataformas digitales que
              generan crecimiento real para nuestros clientes.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedClient(client)}
                className="group relative rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer"
              >

                <div className="relative h-56 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${client.photo})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white/80">
                    {client.industry}
                  </div>
                </div>

                <div className="p-6 space-y-4">

                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                      {client.name}
                    </h3>

                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                      {client.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {client.results.slice(0, 3).map((result, i) => {
                      const Icon = iconMap[result.icon];
                      return (
                        <div key={i} className="text-center p-2 rounded-lg bg-white/5">
                          <Icon className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
                          <div className="text-lg font-bold text-white">
                            {result.value}
                          </div>
                          <div className="text-[10px] text-white/50 uppercase">
                            {result.metric.split(" ")[0]}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 text-sm font-medium hover:bg-white/5 hover:border-indigo-500/50 transition-all">
                    Ver proyecto
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 flex justify-center">
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-500/30"
            >
              Iniciar mi proyecto
            </a>
          </div>

        </div>

        <div className="dotted-line mt-24 mx-6" />
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedClient(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-black border border-white/20 rounded-3xl overflow-hidden"
            >

              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="grid lg:grid-cols-2">

                <div
                  className="relative min-h-[400px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedClient.photo})` }}
                />

                <div className="p-10 space-y-6">

                  <h3 className="text-3xl font-bold">{selectedClient.name}</h3>

                  <p className="text-white/70">
                    {selectedClient.description}
                  </p>

                  <div>
                    <h4 className="text-indigo-400 mb-2">El reto</h4>
                    <p className="text-white/70">{selectedClient.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-purple-400 mb-2">Nuestra solución</h4>
                    <p className="text-white/70">{selectedClient.solution}</p>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientsSection;
import { motion } from "framer-motion";

const technologies = [
  { name: "Laravel", logo: "/logos/laravel.svg" },
  { name: "React", logo: "/logos/react.svg" },
  { name: "TypeScript", logo: "/logos/typescript.svg" },
  { name: "Node.js", logo: "/logos/node.svg" },
  { name: "React native", logo: "/logos/react-native.svg" },
  { name: "AWS", logo: "/logos/aws.svg" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6">

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
            <p className="text-sm tracking-[0.3em] uppercase text-indigo-400 font-medium">
              Sobre Nosotros
            </p>
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            Creamos Tecnología que
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Impulsa tu Negocio
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8">

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-[2]"
          >
            <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">

              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  Desarrollo Web, Apps y
                  <br />
                  Soluciones Digitales
                </h3>

                <p className="text-white/70 leading-relaxed text-lg mb-8">
                  Somos una agencia especializada en desarrollo web, aplicaciones móviles,
                  marketing digital y soluciones tecnológicas a la medida.
                  Ayudamos a empresas en México y Estados Unidos a crecer mediante
                  tecnología moderna, automatización y plataformas digitales
                  optimizadas para generar clientes.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Desarrollo Web Profesional",
                      description:
                        "Creamos sitios web y plataformas optimizadas para SEO, velocidad y conversión.",
                    },
                    {
                      title: "Aplicaciones Móviles",
                      description:
                        "Desarrollamos apps para iOS y Android que conectan tu negocio con tus clientes.",
                    },
                    {
                      title: "Marketing Digital y SEO",
                      description:
                        "Implementamos estrategias para atraer tráfico, generar leads y posicionar tu marca.",
                    },
                    {
                      title: "Automatización con IA",
                      description:
                        "Creamos herramientas inteligentes que optimizan procesos y aumentan productividad.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 mt-2" />

                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-white/60">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Logos */}
                <div className="mt-10">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">
                    Tecnologías que utilizamos
                  </p>

                  <div className="flex flex-wrap gap-6 items-center">
                    {technologies.map((tech, index) => (
                      <img
                        key={index}
                        src={tech.logo}
                        alt={tech.name}
                        className="h-8 opacity-70 hover:opacity-100 transition"
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="text-5xl font-bold text-indigo-400 mb-2">8+</div>
              <p className="text-white/80 font-medium">Años de experiencia</p>
              <p className="text-sm text-white/50 mt-2">
                Construyendo soluciones digitales
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="text-5xl font-bold text-purple-400 mb-2">120+</div>
              <p className="text-white/80 font-medium">Proyectos desarrollados</p>
              <p className="text-sm text-white/50 mt-2">
                Web, sistemas y apps móviles
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="text-5xl font-bold text-pink-400 mb-2">95%</div>
              <p className="text-white/80 font-medium">Clientes satisfechos</p>
              <p className="text-sm text-white/50 mt-2">
                Relaciones a largo plazo
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="dotted-line mt-24 mx-6" />
    </section>
  );
};

export default AboutSection;
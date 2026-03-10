import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { label: "Sobre Nosotros", href: "#about" },
      { label: "Servicios", href: "#services" },
      { label: "Proceso", href: "#process" },
      { label: "Contacto", href: "#contacto" },
    ],
    services: [
      { label: "Desarrollo Web", href: "#services" },
      { label: "Aplicaciones Móviles", href: "#services" },
      { label: "Desarrollo de Software", href: "#services" },
      { label: "Marketing Digital", href: "#services" },
      { label: "Automatización con IA", href: "#services" },
    ],
    resources: [
      { label: "Casos de éxito", href: "#clients" },
      { label: "Solicitar cotización", href: "#contacto" },
      { label: "Soporte", href: "mailto:contacto@osirisdev.com" },
    ],
  };

  const contactInfo = [
    {
      icon: Mail,
      text: "contacto@osirisdev.com",
      href: "mailto:contacto@osirisdev.com",
    },
    {
      icon: Phone,
      text: "+52 656 135 7929",
      href: "tel:+526561357929",
    },
    {
      icon: MapPin,
      text: "México / Estados Unidos",
      href: "#",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black to-black/95 border-t border-white/10">

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="pt-20 pb-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >

              <div className="flex items-center gap-3 mb-6">

                <div className="w-16 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <img
                    src="/Logo.svg"
                    alt="Osiris Development"
                    className="w-12 h-12 invert"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Osiris Development
                  </h3>

                  <p className="text-white/60 text-sm">
                    Desarrollo Web • Software • IA
                  </p>
                </div>

              </div>

              <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                Agencia especializada en desarrollo web, aplicaciones móviles,
                software a la medida y marketing digital. Construimos soluciones
                tecnológicas que ayudan a empresas en México y Estados Unidos a
                crecer y automatizar procesos.
              </p>

              {/* Contact */}
              <div className="space-y-3 mb-8">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-white/60 hover:text-indigo-400 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10">
                        <Icon className="w-4 h-4" />
                      </div>

                      <span className="text-sm">{item.text}</span>
                    </motion.a>
                  );
                })}
              </div>

            </motion.div>

            {/* Links */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">

              {/* Company */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Compañía
                </h4>

                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Servicios
                </h4>

                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Recursos
                </h4>

                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Marquee */}
          <div className="relative overflow-hidden py-8 mb-8">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="text-5xl md:text-7xl font-bold text-white/[0.10] px-8"
                >
                  DESARROLLO WEB ◆ APLICACIONES MÓVILES ◆ SOFTWARE A MEDIDA ◆
                  AUTOMATIZACIÓN CON IA ◆ MARKETING DIGITAL ◆
                </span>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60"
        >
          <p>
            © {new Date().getFullYear()} Osiris Development. Todos los derechos reservados.
          </p>
        </motion.div>

      </div>

    </footer>
  );
};

export default Footer;
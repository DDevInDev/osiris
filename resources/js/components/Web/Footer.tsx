import { motion } from "framer-motion";
import { Sparkles, Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { label: "Sobre Nosotros", href: "#nosotros" },
      { label: "Nuestro Equipo", href: "#team" },
      { label: "Carreras", href: "#careers" },
      { label: "Blog", href: "#blog" },
    ],
    services: [
      { label: "Consultoría Digital", href: "#servicios" },
      { label: "Desarrollo Web", href: "#servicios" },
      { label: "Marketing Digital", href: "#servicios" },
      { label: "Automatización", href: "#servicios" },
    ],
    resources: [
      { label: "Casos de Estudio", href: "#clientes" },
      { label: "Recursos", href: "#resources" },
      { label: "Preguntas Frecuentes", href: "#faq" },
      { label: "Soporte", href: "#support" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "Github" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@osiris.dev", href: "mailto:hello@osiris.dev" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black to-black/95 border-t border-white/10">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section - Larger on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Osiris Development
                  </h3>
                  <p className="text-white/60 text-sm">Business Excellence</p>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                Transformamos visiones en realidad digital. Estrategias innovadoras impulsadas por IA para el crecimiento empresarial del futuro.
              </p>

              {/* Contact Info */}
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
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-indigo-500/20 hover:to-purple-500/20 border border-white/10 hover:border-indigo-500/50 flex items-center justify-center transition-all group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-indigo-400 transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
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
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Services Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
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
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
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
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Animated Marquee */}
          <div className="relative overflow-hidden py-8 mb-8">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex whitespace-nowrap"
            >
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="text-5xl md:text-7xl font-bold text-white/[0.10] px-8"
                >
                  TRANSFORM INTO SUCCESS ◆ INNOVATE WITH AI ◆ BUILD THE FUTURE ◆
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60"
        >
          <p>© 2025 Osiris Development. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
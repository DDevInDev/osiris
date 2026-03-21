import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLocale } from '@/contexts/LocaleContext'

const Footer = () => {
  const { t } = useLocale()

  const footerLinks = {
    company: [
      { label: t.footer.links.company.about, href: '#about' },
      { label: t.footer.links.company.services, href: '#services' },
      { label: t.footer.links.company.process, href: '#process' },
      { label: t.footer.links.company.contact, href: '#contact' },
    ],
    services: [
      { label: t.footer.links.services.webDevelopment, href: '#services' },
      { label: t.footer.links.services.mobileApps, href: '#services' },
      { label: t.footer.links.services.softwareDevelopment, href: '#services' },
      { label: t.footer.links.services.digitalMarketing, href: '#services' },
      { label: t.footer.links.services.aiAutomation, href: '#services' },
    ],
    resources: [
      { label: t.footer.links.resources.caseStudies, href: '#portfolio' },
      { label: t.footer.links.resources.requestQuote, href: '#contact' },
      { label: t.footer.links.resources.support, href: 'mailto:contacto@osirisdev.com' },
    ],
  }

  const contactInfo = [
    {
      icon: Mail,
      text: 'contacto@osirisdev.com',
      href: 'mailto:contacto@osirisdev.com',
    },
    {
      icon: Phone,
      text: '+52 656 135 7929',
      href: 'tel:+526561357929',
    },
    {
      icon: MapPin,
      text: t.footer.contact.location,
      href: '#',
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-black to-black/95">
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="pt-20 pb-12">
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600">
                  <img
                    src="/Logo.svg"
                    alt="Osiris Development"
                    className="h-12 w-12 invert"
                  />
                </div>

                <div>
                  <h3 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
                    Osiris Development
                  </h3>

                  <p className="text-sm text-white/60">
                    {t.footer.brandTagline}
                  </p>
                </div>
              </div>

              <p className="mb-6 max-w-md leading-relaxed text-white/70">
                {t.footer.description}
              </p>

              <div className="mb-8 space-y-3">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex items-center gap-3 text-white/60 transition-colors hover:text-indigo-400"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-indigo-500/10">
                        <Icon className="h-4 w-4" />
                      </div>

                      <span className="text-sm">{item.text}</span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:col-span-7 sm:grid-cols-3">
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                  {t.footer.sections.company}
                </h4>

                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-indigo-400"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                  {t.footer.sections.services}
                </h4>

                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-indigo-400"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                  {t.footer.sections.resources}
                </h4>

                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-indigo-400"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative mb-8 overflow-hidden py-8">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex whitespace-nowrap"
            >
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="px-8 text-5xl font-bold text-white/[0.10] md:text-7xl"
                >
                  {t.footer.marquee}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/60 md:flex-row"
        >
          <p>
            © {new Date().getFullYear()} Osiris Development. {t.footer.copyright}
          </p>
        </motion.div>

        <LanguageSwitcher />
      </div>
    </footer>
  )
}

export default Footer
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react'
import { useLocale } from '@/contexts/LocaleContext'

const Navbar = () => {
  const { t } = useLocale()

  const navLinks = useMemo(
    () => [
      { label: t.navbar.links.home, href: '#home', section: 'home' },
      { label: t.navbar.links.about, href: '#about', section: 'about' },
      { label: t.navbar.links.services, href: '#services', section: 'services' },
      { label: t.navbar.links.process, href: '#process', section: 'process' },
      { label: t.navbar.links.portfolio, href: '#portfolio', section: 'portfolio' },
    ],
    [t]
  )

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isDesktop = !isMobile
  const isMinimal = isDesktop && isScrolled && !isDesktopMenuOpen

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)

      if (!mobile) {
        setIsMobileMenuOpen(false)
      }

      if (mobile) {
        setIsDesktopMenuOpen(false)
      }
    }

    const handleScroll = () => {
      const atTop = window.scrollY <= 10

      setIsScrolled(!atTop)

      if (atTop) {
        setIsDesktopMenuOpen(false)
      }

      for (const link of navLinks) {
        const el = document.getElementById(link.section)

        if (el) {
          const rect = el.getBoundingClientRect()

          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(link.section)
            break
          }
        }
      }
    }

    checkMobile()
    handleScroll()

    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [navLinks])

  const handleHamburgerClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen((prev) => !prev)
      return
    }

    setIsDesktopMenuOpen((prev) => !prev)
  }

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setIsDesktopMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          animate={{ marginTop: isMinimal ? '16px' : '24px' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`flex w-full max-w-7xl items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
            isMinimal
              ? 'border border-transparent bg-transparent shadow-none'
              : 'border border-white/10 bg-black/40 shadow-xl backdrop-blur-xl'
          }`}
        >
          <a href="#home" className="flex-shrink-0" onClick={handleLinkClick}>
            <img
              src="/images/logo.png"
              alt="Osiris Development"
              className="invert"
              width={isMinimal ? 120 : 150}
              style={{ transition: 'width 0.3s ease' }}
            />
          </a>

          <AnimatePresence>
            {isDesktop && (!isMinimal || isDesktopMenuOpen) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hidden items-center gap-2 lg:flex"
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.section

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isDesktop && (!isMinimal || isDesktopMenuOpen) && (
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                href="#contact"
                onClick={handleLinkClick}
                className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 lg:inline-flex"
              >
                <Sparkles className="h-4 w-4" />
                {t.navbar.cta}
              </motion.a>
            )}
          </AnimatePresence>

          {(isMobile || isMinimal) && (
            <button
              type="button"
              onClick={handleHamburgerClick}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
            >
              {(isMobile ? isMobileMenuOpen : isDesktopMenuOpen) ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          )}
        </motion.nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-4 right-4 z-50 mx-auto max-w-md"
            >
              <div className="rounded-3xl border border-white/20 bg-black/90 p-6 backdrop-blur-2xl">
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex justify-between rounded-2xl px-5 py-4 text-white/80 transition hover:bg-white/5"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ))}

                  <a
                    href="#contact"
                    onClick={handleLinkClick}
                    className="mt-4 flex w-full justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                    {t.navbar.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
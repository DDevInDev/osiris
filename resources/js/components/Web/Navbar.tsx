import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDesktop = !isMobile;
  const isMinimal = isDesktop && isScrolled && !isDesktopMenuOpen;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
      if (mobile) {
        setIsDesktopMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const atTop = window.scrollY <= 10;

      setIsScrolled(!atTop);

      if (atTop) {
        setIsDesktopMenuOpen(false);
      }

      const sections = navLinks.map(link =>
        link.href.replace("#", "")
      );

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };


    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHamburgerClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(prev => !prev);
    } else {
      setIsDesktopMenuOpen(prev => !prev);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          animate={{ marginTop: isMinimal ? "16px" : "24px" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${isMinimal
            ? "bg-transparent shadow-none"
            : "bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl"
            }`}
        >
          {/* LOGO */}
          <a href="#inicio" className="flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="logo"
              className="invert"
              width={isMinimal ? 120 : 150}
              style={{ transition: "width 0.3s ease" }}
            />
          </a>

          {/* DESKTOP MENU */}
          <AnimatePresence>
            {isDesktop && (!isMinimal || isDesktopMenuOpen) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hidden lg:flex items-center gap-2"
              >
                {navLinks.map(link => {
                  const isActive =
                    activeSection === link.href.replace("#", "");

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`px-4 py-2 text-sm rounded-full transition ${isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* DESKTOP CTA */}
          <AnimatePresence>
            {isDesktop && (!isMinimal || isDesktopMenuOpen) && (
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                href="#contacto"
                className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform"
              >
                <Sparkles className="w-4 h-4" />
                Cotizar proyecto
              </motion.a>
            )}
          </AnimatePresence>

          {/* HAMBURGER */}
          {(isMobile || isMinimal) && (
            <button
              onClick={handleHamburgerClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
            >
              {(isMobile
                ? isMobileMenuOpen
                : isDesktopMenuOpen) ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          )}
        </motion.nav>
      </header>

      {/* MOBILE PANEL */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-4 right-4 z-50 max-w-md mx-auto"
            >
              <div className="bg-black/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-6">
                <div className="space-y-3">
                  {navLinks.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex justify-between px-5 py-4 rounded-2xl text-white/80 hover:bg-white/5 transition"
                    >
                      {link.label}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ))}

                  <a
                    href="#contacto"
                    onClick={handleLinkClick}
                    className="flex justify-center gap-2 w-full mt-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  >
                    <Sparkles className="w-4 h-4" />
                    Cotizar proyecto
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

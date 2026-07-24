import { NavLink, useLocation } from 'react-router-dom'
import { Code2, Menu, X, Home, User, FolderGit2, Mail, Sparkles, Terminal} from 'lucide-react'
import ThemeToggle from '@/components/common/ThemeToggle'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin} from 'react-icons/fa'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/sobre', label: 'Sobre', icon: User },
  { to: '/projetos', label: 'Projetos', icon: FolderGit2 },
  { to: '/contacto', label: 'Contacto', icon: Mail },
]

const socialLinks = [
  { icon: FaGithub, url: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: FaLinkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Variants para animação do menu mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? 'bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
            : 'bg-transparent border-b border-border/20'
          }
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-2 group relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg blur-md group-hover:blur-xl transition-all duration-300" />
                <div className="relative flex items-center gap-2 font-semibold text-foreground">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 group-hover:border-primary/30 transition-all duration-300">
                    <Code2 size={20} className="text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-lg font-bold tracking-tight">
                    EM<span className="text-primary">.</span>
                  </span>
                </div>
              </div>

              {/* Badge de status */}
              <span className="hidden sm:flex absolute -top-1 -right-10 items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-[8px] font-medium text-primary border border-primary/20">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                dev
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `
                      relative px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-300
                      ${isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{link.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />

                {/* Social links desktop */}
                <div className="flex items-center gap-1 ml-2 pl-2 border-l border-border/50">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg text-foreground hover:bg-muted/50 transition-all duration-300"
                aria-label="Abrir menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        {/* Indicador de progresso de scroll */}
        <div className="h-0.5 bg-primary/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-primary via-primary/50 to-primary"
            initial={{ width: '0%' }}
            animate={{
              width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay com blur */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Mobile */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 z-40 h-full w-full max-w-sm bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header do menu mobile */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <Code2 size={18} className="text-primary" />
                    </div>
                    <span className="font-semibold">Menu</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Links do menu */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {links.map((link) => (
                      <motion.div
                        key={link.to}
                        variants={itemVariants}
                        custom={links.indexOf(link)}
                      >
                        <NavLink
                          to={link.to}
                          end={link.to === '/'}
                          className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl
                            transition-all duration-300
                            ${isActive
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'text-foreground hover:bg-muted/50'
                            }
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          <link.icon className="w-5 h-5" />
                          <span className="font-medium">{link.label}</span>
                          {location.pathname === link.to && (
                            <motion.div
                              layoutId="mobile-indicator"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                            />
                          )}
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-6 border-t border-border/50" />

                  {/* Info do desenvolvedor */}
                  <motion.div
                    variants={itemVariants}
                    custom={4}
                    className="p-4 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Terminal className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Erivaldo Manuel</p>
                        <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        Disponível para projetos
                      </span>
                    </div>
                  </motion.div>

                  {/* Social links mobile */}
                  <motion.div
                    variants={itemVariants}
                    custom={5}
                    className="mt-4 flex items-center justify-center gap-3"
                  >
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </motion.div>
                </nav>

                {/* Footer do menu mobile */}
                <div className="p-4 border-t border-border/50 text-center">
                  <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Erivaldo Manuel
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Espaçador para conteúdo */}
      <div className="h-16 sm:h-20" />
    </>
  )
}

export default Navbar

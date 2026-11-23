import { NavLink} from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  Code2,
  Menu,
  X,
  Home,
  User,
  FolderGit2,
  Mail,
  Terminal,
  ArrowUpRight,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import ThemeToggle from '@/components/common/ThemeToggle'
import LanguageSwitcher from '@/components/language/LanguageSwitcher'

// ============================================================
// LINKS DE NAVEGAÇÃO
// ============================================================
// `to` e `icon` são estruturais. O label vem de nav.{navKey} no
// common.json — não muda a rota, só o texto exibido.
// `cta: true` → no desktop o link aparece como botão de destaque
// (à direita) em vez de ficar no grupo central.

type NavItem = {
  to: string
  navKey: string
  icon: LucideIcon
  cta?: boolean
}

const links: NavItem[] = [
  { to: '/', navKey: 'home', icon: Home },
  { to: '/sobre', navKey: 'about', icon: User },
  { to: '/projetos', navKey: 'projects', icon: FolderGit2 },
  { to: '/contacto', navKey: 'contact', icon: Mail, cta: true },
]

const mainLinks = links.filter((l) => !l.cta)
const ctaLink = links.find((l) => l.cta)

const socialLinks = [
  { icon: FaGithub, url: 'https://github.com/Erivaldo07', label: 'GitHub' },
  {
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/erivaldo-manuel-5076492aa/',
    label: 'LinkedIn',
  },
]

// Animação do menu mobile
const menuVariants: Variants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  closed: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const overlayVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, transition: { duration: 0.3 } },
}

// Classes de foco reutilizadas (acessibilidade por teclado)
const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

function Navbar() {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Barra de progresso: useScroll + useSpring escrevem direto no DOM,
  // por isso o scroll já não provoca re-renders da navbar.
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  // Fecha com Esc e quando o ecrã passa para desktop (md+)
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const handleBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    mq.addEventListener('change', handleBreakpoint)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      mq.removeEventListener('change', handleBreakpoint)
    }
  }, [isOpen])

  // Trava o scroll do conteúdo de fundo enquanto o menu mobile está aberto.
  // `position: fixed` só no <body> não é suficiente em todo navegador —
  // travamos também o <html> e forçamos `overflow: hidden` nos dois,
  // além de fixar a posição pra evitar o bounce scroll do iOS.
  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY
    const bodyStyle = document.body.style
    const htmlStyle = document.documentElement.style

    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.left = '0'
    bodyStyle.right = '0'
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    htmlStyle.overflow = 'hidden'

    return () => {
      bodyStyle.position = ''
      bodyStyle.top = ''
      bodyStyle.left = ''
      bodyStyle.right = ''
      bodyStyle.width = ''
      bodyStyle.overflow = ''
      htmlStyle.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  // Só guarda um boolean → o React ignora o setState quando o valor
  // não muda, então não há re-render a cada pixel de scroll.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Com o menu aberto o header fica sempre sólido
  const solid = scrolled || isOpen

  return (
    <MotionConfig reducedMotion="user">
      {/* Skip link: aparece só ao navegar com Tab */}
      <a
        href="#main-content"
        className="sr-only z-60 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t('navbar.skipToContent', 'Saltar para o conteúdo')}
      </a>

      <header
        className={`
          fixed inset-x-0 top-0 z-50 border-b transition-all duration-300
          ${
            solid
              ? 'border-border/50 bg-card/80 shadow-lg shadow-black/5 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }
        `}
      >
        <nav
          aria-label={t('navbar.mainNavigation', 'Navegação principal')}
          className="mx-auto max-w-7xl px-4 sm:px-6"
        >
          <div
            className={`flex h-16 items-center justify-between gap-4 transition-all duration-300 ${
              scrolled ? 'md:h-16' : 'md:h-20'
            }`}
          >
            {/* Logo */}
            <NavLink
              to="/"
              aria-label={`Erivaldo Manuel — ${t('nav.home')}`}
              className={`group relative flex shrink-0 items-center gap-2 rounded-lg ${focusRing}`}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/20 to-primary/5 blur-md transition-all duration-300 group-hover:blur-xl" />
                <div className="relative flex items-center gap-2 font-semibold text-foreground">
                  <div className="rounded-lg border border-primary/10 bg-linear-to-br from-primary/20 to-primary/5 p-1.5 transition-all duration-300 group-hover:border-primary/30">
                    <Code2
                      size={20}
                      className="text-primary transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-lg font-bold tracking-tight">
                    EM<span className="text-primary">.</span>
                  </span>
                </div>
              </div>
            </NavLink>

            {/* Desktop: links centrados */}
            <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
              {mainLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `
                    relative rounded-lg px-3.5 py-2 text-sm font-medium
                    transition-colors duration-300 ${focusRing}
                    ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{t(`nav.${link.navKey}`)}</span>
                      {isActive && (
                        <motion.span
                          layoutId="navbar-indicator"
                          className="absolute inset-0 rounded-lg border border-primary/20 bg-primary/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop: ações à direita */}
            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              <LanguageSwitcher />

              <div className="ml-1 hidden items-center gap-1 border-l border-border/50 pl-3 lg:flex">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-muted/50 hover:text-foreground ${focusRing}`}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              {ctaLink && (
                <NavLink
                  to={ctaLink.to}
                  className={({ isActive }) => `
                    group/cta ml-1 inline-flex items-center gap-1.5 rounded-lg border
                    px-4 py-2 text-sm font-medium transition-all duration-300 ${focusRing}
                    ${
                      isActive
                        ? 'border-primary/20 bg-primary/10 text-primary'
                        : 'border-transparent bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:-translate-y-px hover:shadow-lg hover:shadow-primary/30'
                    }
                  `}
                >
                  {t(`nav.${ctaLink.navKey}`)}
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                  />
                </NavLink>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <LanguageSwitcher />

              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`relative rounded-lg p-2 text-foreground transition-all duration-300 hover:bg-muted/50 ${focusRing}`}
                aria-label={isOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        {/* Barra de progresso — absoluta, por isso não altera a altura do header */}
        <motion.div
          aria-hidden
          style={{ scaleX }}
          className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-primary via-primary/60 to-primary transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-hidden
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label={t('navbar.mainNavigation', 'Navegação principal')}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-16 z-40 h-[calc(100dvh-4rem)] w-full max-w-sm border-l border-t border-border/50 bg-card/95 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {links.map((link) => (
                      <motion.div key={link.to} variants={itemVariants}>
                        <NavLink
                          to={link.to}
                          end={link.to === '/'}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) => `
                            flex items-center gap-3 rounded-xl border px-4 py-3
                            transition-all duration-300 ${focusRing}
                            ${
                              isActive
                                ? 'border-primary/20 bg-primary/10 text-primary'
                                : 'border-transparent text-foreground hover:bg-muted/50'
                            }
                          `}
                        >
                          {({ isActive }) => (
                            <>
                              <link.icon className="h-5 w-5" aria-hidden />
                              <span className="font-medium">{t(`nav.${link.navKey}`)}</span>
                              {isActive && (
                                <motion.span
                                  layoutId="mobile-indicator"
                                  className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                                />
                              )}
                            </>
                          )}
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>

                  <div className="my-6 border-t border-border/50" />

                  <motion.div
                    variants={itemVariants}
                    className="rounded-xl border border-primary/10 bg-linear-to-br from-primary/5 to-primary/10 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Terminal className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Erivaldo Manuel</p>
                        <p className="text-xs text-muted-foreground">{t('hero.role')}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="relative flex h-2 w-2" aria-hidden>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-xs text-muted-foreground">{t('hero.available')}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="mt-4 flex items-center justify-center gap-3"
                  >
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`rounded-xl bg-muted/30 p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-muted/50 hover:text-foreground ${focusRing}`}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </motion.div>
                </div>

                <div className="border-t border-border/50 p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Erivaldo Manuel
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Espaçador: igual à altura inicial do header */}
      <div className="h-16 md:h-20" />
    </MotionConfig>
  )
}

export default Navbar

import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'

type LayoutVariant = 'default' | 'centered' | 'full'

type LayoutProps = {
  showLoader?: boolean
  variant?: LayoutVariant
  className?: string
}

// Animação de transição entre páginas
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

// Animação do loader
const loaderVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

// Classes de layout do container por variante — não é um Variants do
// framer-motion, é só CSS; renomeado para não confundir com os de cima.
const containerClassNames: Record<LayoutVariant, string> = {
  default: 'max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12',
  centered:
    'max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center justify-center min-h-[calc(100vh-16rem)]',
  full: 'w-full px-0',
}

function Layout({ showLoader = false, variant = 'default', className = '' }: LayoutProps) {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(showLoader)
  const [pageLoaded, setPageLoaded] = useState(!showLoader)

  // Simular carregamento de página
  useEffect(() => {
    if (!showLoader) {
      const frame = window.requestAnimationFrame(() => {
        setIsLoading(false)
        setPageLoaded(true)
      })

      return () => window.cancelAnimationFrame(frame)
    }

    const frame = window.requestAnimationFrame(() => {
      setIsLoading(true)
      setPageLoaded(false)
    })

    const timer = window.setTimeout(() => {
      setIsLoading(false)
      setPageLoaded(true)
    }, 600)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [location.pathname, showLoader])

  return (
    <div
      className={`
        min-h-screen bg-background text-foreground
        flex flex-col
        ${className}
      `}
    >
      {/* Navbar com scroll progress */}
      <Navbar />

      {/* Main content com animações */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          {isLoading ? (
            // Loader
            <motion.div
              key="loader"
              variants={loaderVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-muted-foreground">Carregando...</span>
                </div>
              </div>
            </motion.div>
          ) : (
            // Conteúdo da página
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className={`
                ${containerClassNames[variant]}
                ${pageLoaded ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-300
              `}
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer com ajuste de posição */}
      <Footer variant="standard" showBackToTop showSocial showContact />

      {/* Indicador de scroll suave */}
      <div className="fixed bottom-4 left-4 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Live</span>
        </div>
      </div>

      {/* Grid de fundo decorativo */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default Layout

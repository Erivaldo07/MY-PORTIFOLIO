import { Mail, Heart, Sparkles, Code, Briefcase, MapPin, ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

type SocialLink = {
  name: string
  icon: typeof FaGithub
  url: string
  color: string
}

type FooterProps = {
  variant?: 'minimal' | 'standard' | 'detailed'
  showBackToTop?: boolean
  showSocial?: boolean
  showContact?: boolean
  className?: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/yourusername',
    color: 'hover:text-[#6e5494]'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/yourusername',
    color: 'hover:text-[#0A66C2]'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/yourusername',
    color: 'hover:text-[#1DA1F2]'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/yourusername',
    color: 'hover:text-[#E4405F]'
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: 'https://youtube.com/@yourusername',
    color: 'hover:text-[#FF0000]'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:your@email.com',
    color: 'hover:text-[#EA4335]'
  }
]

function Footer({
  variant = 'standard',
  showBackToTop = true,
  showSocial = true,
  showContact = true,
  className = ''
}: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: 'easeOut'
      }
    })
  }

  // Renderização por variante
  const renderFooter = () => {
    switch (variant) {
      case 'minimal':
        return (
          <footer className={`
            border-t border-border/50 bg-card/30 backdrop-blur-sm
            px-4 py-8 text-center text-sm text-muted-foreground
            ${className}
          `}>
            <div className="max-w-7xl mx-auto">
              <p className="flex items-center justify-center gap-2">
                © {currentYear} Erivaldo Manuel
                <span className="text-primary/30">·</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-500/70 animate-pulse" />
                  <span className="text-xs">crafted with care</span>
                </span>
              </p>
            </div>
          </footer>
        )

      case 'detailed':
        return (
          <footer className={`
            border-t border-border/50 bg-card/60 backdrop-blur-md
            ${className}
          `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Coluna 1 - Sobre */}
                <motion.div
                  variants={itemVariants}
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Sobre
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Code className="w-4 h-4 text-primary/60" />
                    <span className="text-xs text-muted-foreground">React · Node · TypeScript</span>
                  </div>
                </motion.div>

                {/* Coluna 2 - Links Rápidos */}
                <motion.div
                  variants={itemVariants}
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Links
                  </h3>
                  <ul className="space-y-2">
                    {['Projetos', 'Sobre', 'Experiência', 'Contato'].map((item, i) => (
                      <li key={i}>
                        <a
                          href={`#${item.toLowerCase()}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Coluna 3 - Contato */}
                {showContact && (
                  <motion.div
                    variants={itemVariants}
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Contato
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-3.5 h-3.5 text-primary/60" />
                        <a
                          href="mailto:your@email.com"
                          className="hover:text-primary transition-colors"
                        >
                          your@email.com
                        </a>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-primary/60" />
                        <span>Luanda, Angola</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-3.5 h-3.5 text-primary/60" />
                        <span>Disponível para projetos</span>
                      </li>
                    </ul>
                  </motion.div>
                )}

                {/* Coluna 4 - Social */}
                {showSocial && (
                  <motion.div
                    variants={itemVariants}
                    custom={3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Redes Sociais
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {socialLinks.slice(0, 6).map((social, i) => (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`
                            p-2 rounded-lg bg-muted/30 hover:bg-muted/50
                            text-muted-foreground ${social.color}
                            transition-all duration-300 hover:scale-110
                          `}
                          aria-label={social.name}
                        >
                          <social.icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span>Vamos construir algo incrível juntos!</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer bottom */}
              <motion.div
                variants={itemVariants}
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>© {currentYear} Erivaldo Manuel</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-500/70 animate-pulse" />
                    <span>Todos os direitos reservados</span>
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
                  <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
                </div>
              </motion.div>
            </div>
          </footer>
        )

      default: // standard
        return (
          <footer className={`
            border-t border-border/50 bg-card/30 backdrop-blur-sm
            ${className}
          `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Esquerda - Copyright */}
                <motion.div
                  variants={itemVariants}
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span>© {currentYear}</span>
                  <span className="font-medium text-foreground">Erivaldo Manuel</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-primary/60" />
                    <span className="text-xs">Full Stack Developer</span>
                  </span>
                </motion.div>

                {/* Centro - Social */}
                {showSocial && (
                  <motion.div
                    variants={itemVariants}
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    {socialLinks.slice(0, 4).map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          p-1.5 rounded-md text-muted-foreground ${social.color}
                          transition-all duration-300 hover:scale-110 hover:bg-muted/50
                        `}
                        aria-label={social.name}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </motion.div>
                )}

                {/* Direita - Tech Stack */}
                <motion.div
                  variants={itemVariants}
                  custom={2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span>Construído com</span>
                  <span className="flex items-center gap-1">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                      alt="React"
                      className="w-4 h-4"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                      alt="TypeScript"
                      className="w-4 h-4"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                      alt="Tailwind"
                      className="w-4 h-4"
                    />
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="hidden sm:inline">v1.0.0</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </footer>
        )
    }
  }

  return (
    <>
      {renderFooter()}

      {/* Botão Voltar ao Topo */}
      {showBackToTop && (
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110 group"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </>
  )
}

export default Footer

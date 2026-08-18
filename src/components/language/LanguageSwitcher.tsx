import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Globe } from 'lucide-react'

const LANGS = [
  { code: 'pt', label: 'Português', short: 'PT', flag: '🇵🇹' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
] as const

/**
 * Dropdown de idioma (PT/EN). Fecha ao clicar fora, ao pressionar
 * Esc, ou ao selecionar uma opção. Coloque no Navbar, ao lado do
 * ThemeToggle.
 */
function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = i18n.language.startsWith('en') ? 'en' : 'pt'
  const currentLang = LANGS.find((l) => l.code === current) ?? LANGS[0]

  const selectLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  // Fecha ao clicar fora do componente
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Fecha com Esc
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Alternar idioma / Switch language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`
          flex items-center gap-1.5 pl-2.5 pr-2 py-1.5 rounded-lg
          text-xs font-medium transition-all duration-300
          border
          ${
            isOpen
              ? 'bg-primary/10 border-primary/20 text-primary'
              : 'bg-muted/30 border-transparent text-muted-foreground hover:bg-primary/10 hover:text-primary'
          }
        `}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="tabular-nums">{currentLang.short}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className="absolute right-0 mt-2 w-40 rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-xl shadow-black/5 overflow-hidden z-50 origin-top-right"
          >
            {LANGS.map((lang) => {
              const isActive = lang.code === current

              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => selectLanguage(lang.code)}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2.5 text-sm
                    transition-colors duration-150
                    ${
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.label}</span>
                  {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher

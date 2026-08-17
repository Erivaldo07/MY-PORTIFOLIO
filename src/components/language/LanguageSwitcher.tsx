import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'

const LANGS = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
] as const

/**
 * Botão simples de alternância PT/EN.
 * Coloque no Navbar, ao lado do ThemeToggle.
 */
function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const current = i18n.language.startsWith('en') ? 'en' : 'pt'

  const toggleLanguage = () => {
    const next = current === 'pt' ? 'en' : 'pt'
    i18n.changeLanguage(next)
  }

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Alternar idioma / Switch language"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/30 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 text-xs font-medium"
    >
      <Languages className="w-3.5 h-3.5" />
      {LANGS.find((l) => l.code === current)?.label}
    </button>
  )
}

export default LanguageSwitcher

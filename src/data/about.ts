import {
  Rocket,
  Target,
  Code2,
  BookOpen,
  Award,
  Lightbulb,
  Users,
  Layers,
  Server,
  Globe,
} from 'lucide-react'

// ============================================================
// DADOS ESTRUTURAIS DA PÁGINA "SOBRE"
// ============================================================
// Só os ícones e valores numéricos ficam aqui — o texto (label,
// title, description) vem do i18n/locales/{lang}/about.json,
// combinado via o hook useTranslatedAbout().

export const journeyStatsBase = [
  { value: 15, suffix: '+', icon: Rocket },
  { value: 4, suffix: '', icon: Target },
  { value: 15, suffix: '+', icon: Code2 },
]

export const valuesBase = [
  { icon: BookOpen },
  { icon: Award },
  { icon: Lightbulb },
  { icon: Users },
]

export const techInterestsBase = [
  { icon: Layers },
  { icon: Server },
  { icon: Code2 },
  { icon: Globe },
]

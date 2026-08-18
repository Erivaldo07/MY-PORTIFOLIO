import { Code2, Users, Briefcase, Award } from 'lucide-react'

// ============================================================
// DADOS ESTRUTURAIS DA HOME
// ============================================================
// Ícones e números ficam aqui. Labels/textos vêm de
// i18n/locales/{lang}/home.json via useTranslatedHome().

export const statsBase = [
  { value: 15, suffix: '+', icon: Code2 },
  { value: 10, suffix: '+', icon: Users },
  { value: 2, suffix: '+', icon: Briefcase },
  { value: 15, suffix: '+', icon: Award },
]

export const experiencesBase = [
  { period: '2024-2025' },
  { period: '2025 - 2026' },
]

// Skills técnicas (nomes de tecnologias) não são traduzidas —
// "React & Next.js" é igual em qualquer idioma.
export const skills = [
  { name: 'React & Next.js', level: 90, color: '#61DAFB' },
  { name: 'TypeScript', level: 85, color: '#3178C6' },
  { name: 'Node.js', level: 88, color: '#339933' },
  { name: 'Tailwind CSS', level: 90, color: '#06B6D4' },
  { name: 'Laravel', level: 75, color: '#FF2D20' },
  { name: 'MySQL & Prisma', level: 80, color: '#4479A1' },
]

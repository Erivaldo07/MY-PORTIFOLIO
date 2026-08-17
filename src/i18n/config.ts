import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonPT from './locales/pt/common.json'
import commonEN from './locales/en/common.json'
import projectsPT from './locales/pt/projects.json'
import projectsEN from './locales/en/projects.json'
import profilePT from './locales/pt/profile.json'
import profileEN from './locales/en/profile.json'
import milestonesPT from './locales/pt/milestones.json'
import milestonesEN from './locales/en/milestones.json'
import skillsPT from './locales/pt/skills.json'
import skillsEN from './locales/en/skills.json'

// ============================================================
// RECURSOS
// ============================================================
// Cada idioma tem vários "namespaces": common (interface),
// projects (texto dos projetos), profile (bio), milestones
// (marcos da página Trajetória) e skills (títulos dos grupos
// de tecnologias). Isso evita um JSON gigante e deixa fácil
// achar o que editar.

const resources = {
  pt: {
    common: commonPT,
    projects: projectsPT,
    profile: profilePT,
    milestones: milestonesPT,
    skills: skillsPT,
  },
  en: {
    common: commonEN,
    projects: projectsEN,
    profile: profileEN,
    milestones: milestonesEN,
    skills: skillsEN,
  },
} as const

i18n
  .use(LanguageDetector) // detecta idioma do navegador/localStorage automaticamente
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en'],
    defaultNS: 'common',
    ns: ['common', 'projects', 'profile', 'milestones', 'skills'],

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'portfolio-lang',
    },

    interpolation: {
      escapeValue: false, // React já escapa por padrão
    },
  })

export default i18n

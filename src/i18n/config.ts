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
import aboutPT from './locales/pt/about.json'
import aboutEN from './locales/en/about.json'
import homePT from './locales/pt/home.json'
import homeEN from './locales/en/home.json'
import contactPT from './locales/pt/contact.json'
import contactEN from './locales/en/contact.json'

// ============================================================
// RECURSOS
// ============================================================
// Um namespace por "área" do site — evita um JSON gigante e
// deixa fácil achar o que editar.

const resources = {
  pt: {
    common: commonPT,
    projects: projectsPT,
    profile: profilePT,
    milestones: milestonesPT,
    skills: skillsPT,
    about: aboutPT,
    home: homePT,
    contact: contactPT,
  },
  en: {
    common: commonEN,
    projects: projectsEN,
    profile: profileEN,
    milestones: milestonesEN,
    skills: skillsEN,
    about: aboutEN,
    home: homeEN,
    contact: contactEN,
  },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en'],
    defaultNS: 'common',
    ns: ['common', 'projects', 'profile', 'milestones', 'skills', 'about', 'home', 'contact'],

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'portfolio-lang',
    },

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

import { useTranslation } from 'react-i18next'
import { projects as baseProjects } from '@/data/projects'

// ============================================================
// TIPOS
// ============================================================

interface ProjectTranslation {
  title: string
  tag: string
  description: string
}

// ============================================================
// HOOK: LISTA DE PROJETOS TRADUZIDA
// ============================================================

/**
 * Retorna `data/projects.ts` com title/tag/description trocados
 * pela tradução do idioma atual. Os campos estruturais (slug,
 * stack, urls, ícone, stars, forks, featured, category, image,
 * date, views) continuam vindo direto do arquivo original.
 *
 * Se o idioma atual for PT (idioma-base dos seus dados) e a
 * chave não existir na tradução, cai automaticamente no texto
 * original do data/projects.ts — não precisa duplicar o PT.
 */
export function useTranslatedProjects() {
  const { t } = useTranslation('projects')

  return baseProjects.map((project) => {
    const translation = t(project.slug, {
      returnObjects: true,
      defaultValue: {},
    }) as Partial<ProjectTranslation>

    return {
      ...project,
      title: translation.title ?? project.title,
      tag: translation.tag ?? project.tag,
      description: translation.description ?? project.description,
    }
  })
}

// ============================================================
// HOOK: UM PROJETO TRADUZIDO (usado na página de detalhe)
// ============================================================

export function useTranslatedProject(slug?: string) {
  const { t } = useTranslation('projects')

  const project = baseProjects.find((p) => p.slug === slug)
  if (!project) return { project: undefined }

  const translation = t(slug ?? '', {
    returnObjects: true,
    defaultValue: {},
  }) as Partial<ProjectTranslation>

  const translatedProject = {
    ...project,
    title: translation.title ?? project.title,
    tag: translation.tag ?? project.tag,
    description: translation.description ?? project.description,
  }

  return { project: translatedProject }
}

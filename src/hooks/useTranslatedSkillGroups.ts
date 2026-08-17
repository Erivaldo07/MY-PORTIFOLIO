import { useTranslation } from 'react-i18next'
import { skillGroups as baseSkillGroups } from '@/data/skills'

/**
 * Traduz apenas o `title` de cada grupo de skills (ex: "Dados" -> "Data").
 * Os `items` (nomes de tecnologias: React, Laravel, MySQL...) não são
 * traduzidos — são nomes próprios, iguais nos dois idiomas.
 */
export function useTranslatedSkillGroups() {
  const { t } = useTranslation('skills')

  return baseSkillGroups.map((group, index) => {
    const translation = t(String(index), {
      returnObjects: true,
      defaultValue: {},
    }) as { title?: string }

    return {
      ...group,
      title: translation.title ?? group.title,
    }
  })
}

import { useTranslation } from 'react-i18next'
import { milestones as baseMilestones } from '@/data//milestones'

interface MilestoneTranslation {
  title: string
  text: string
}

/**
 * Traduz os marcos da página Trajetória. Como `Milestone` não tem
 * slug, a tradução é indexada pela posição no array (mesma ordem
 * do data/journey.ts) — por isso é importante não reordenar um
 * arquivo sem atualizar o outro.
 */
export function useTranslatedMilestones() {
  const { t } = useTranslation('milestones')

  return baseMilestones.map((milestone, index) => {
    const translation = t(String(index), {
      returnObjects: true,
      defaultValue: {},
    }) as Partial<MilestoneTranslation>

    return {
      ...milestone,
      title: translation.title ?? milestone.title,
      text: translation.text ?? milestone.text,
    }
  })
}

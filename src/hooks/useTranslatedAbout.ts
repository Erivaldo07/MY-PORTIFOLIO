import { useTranslation } from 'react-i18next'
import {
  journeyStatsBase,
  valuesBase,
  techInterestsBase,
} from '@/data/about'

/**
 * Combina os dados estruturais de data/about.ts (ícones, números)
 * com o texto do namespace "about" no idioma atual.
 *
 * Uso na página:
 *   const { t, journeyStats, values, techInterests, achievements, storyParagraphs } = useTranslatedAbout()
 */
export function useTranslatedAbout() {
  const { t } = useTranslation('about')

  const journeyStats = journeyStatsBase.map((stat, index) => ({
    ...stat,
    label: t(`journeyStats.${index}.label`, { defaultValue: '' }),
  }))

  const values = valuesBase.map((value, index) => ({
    ...value,
    title: t(`values.items.${index}.title`, { defaultValue: '' }),
    description: t(`values.items.${index}.description`, {
      defaultValue: '',
    }),
  }))

  const techInterests = techInterestsBase.map((tech, index) => ({
    ...tech,
    name: t(`tech.items.${index}.name`, { defaultValue: '' }),
    description: t(`tech.items.${index}.description`, {
      defaultValue: '',
    }),
  }))

  const achievements = t('achievements', {
    returnObjects: true,
    defaultValue: [],
  }) as string[]

  const storyParagraphs = t('story.paragraphs', {
    returnObjects: true,
    defaultValue: [],
  }) as string[]

  return { t, journeyStats, values, techInterests, achievements, storyParagraphs }
}

import { useTranslation } from 'react-i18next'
import { statsBase, experiencesBase } from '@/data/home'

export function useTranslatedHome() {
  const { t } = useTranslation('home')

  const stats = statsBase.map((stat, index) => ({
    ...stat,
    label: t(`stats.${index}.label`, { defaultValue: '' }),
  }))

  const experiences = experiencesBase.map((exp, index) => ({
    ...exp,
    title: t(`experiences.${index}.title`, { defaultValue: '' }),
    company: t(`experiences.${index}.company`, { defaultValue: '' }),
    description: t(`experiences.${index}.description`, { defaultValue: '' }),
    achievements: t(`experiences.${index}.achievements`, {
      returnObjects: true,
      defaultValue: [],
    }) as string[],
  }))

  return { stats, experiences }
}

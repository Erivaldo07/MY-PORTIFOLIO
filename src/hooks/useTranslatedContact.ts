import { useTranslation } from 'react-i18next'
import { contactMethodsBase, socialLinks } from '@/data/contact'

export function useTranslatedContact() {
  const { t } = useTranslation('contact')

  const contactMethods = contactMethodsBase.map((method, index) => ({
    ...method,
    label: t(`methods.${index}.label`, { defaultValue: '' }),
    // se `value` já veio do profile (email/telefone), mantém;
    // senão usa a tradução (ex: "Mensagem rápida" / "Quick message")
    value: method.value ?? t(`methods.${index}.value`, { defaultValue: '' }),
    description: t(`methods.${index}.description`, { defaultValue: '' }),
  }))

  const metrics = [0, 1, 2].map((index) => ({
    value: t(`metrics.${index}.value`, { defaultValue: '' }),
    label: t(`metrics.${index}.label`, { defaultValue: '' }),
  }))

  const faqs = [0, 1, 2, 3].map((index) => ({
    question: t(`faqs.${index}.question`, { defaultValue: '' }),
    answer: t(`faqs.${index}.answer`, { defaultValue: '' }),
  }))

  return { t, contactMethods, socialLinks, metrics, faqs }
}

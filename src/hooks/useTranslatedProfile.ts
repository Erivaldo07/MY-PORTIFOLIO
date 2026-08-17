import { useTranslation } from 'react-i18next'
import { profile as baseProfile } from '@/data/profile'

/**
 * Retorna o perfil com os campos fixos (nome, email, telefone,
 * links) intactos e `role`/`description` traduzidos conforme o
 * idioma atual.
 */
export function useTranslatedProfile() {
  const { t } = useTranslation('profile')

  return {
    ...baseProfile,
    role: t('role', { defaultValue: baseProfile.role }),
    description: t('description', { defaultValue: baseProfile.description }),
  }
}

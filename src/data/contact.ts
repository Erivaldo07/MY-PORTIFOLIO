import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from './profile'

// ============================================================
// MÉTODOS DE CONTATO
// ============================================================
// Ícone, cor e link são estruturais. Label/description/value
// (quando não vem do profile) são traduzidos via home.json... contact.json.

export const contactMethodsBase = [
  {
    icon: Mail,
    href: `mailto:${profile.email}`,
    value: profile.email, // vem do profile, não é traduzido
    color: '#EA4335',
  },
  {
    icon: Phone,
    href: profile.phoneHref,
    value: profile.phone, // vem do profile, não é traduzido
    color: '#34A853',
  },
  {
    icon: MessageCircle,
    href: `https://wa.me/${profile.phone.replace(/\D/g, '')}`,
    value: undefined, // traduzido ("Mensagem rápida" / "Quick message")
    color: '#25D366',
  },
  {
    icon: MapPin,
    href: '#',
    value: undefined, // traduzido ("Luanda, Angola" — nome próprio, igual nos 2 idiomas)
    color: '#4285F4',
  },
]

// ============================================================
// REDES SOCIAIS
// ============================================================
// 100% estrutural — "GitHub"/"LinkedIn" são nomes próprios,
// não precisam de tradução.

export const socialLinks = [
  { icon: FaGithub, url: profile.github, label: 'GitHub', color: '#6e5494' },
  { icon: FaLinkedin, url: profile.linkedin, label: 'LinkedIn', color: '#0A66C2' },
]

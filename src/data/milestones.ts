import { MessagesSquare, MapPinned, Sparkles, Landmark, type LucideIcon } from 'lucide-react'

export type Milestone = {
  icon: LucideIcon
  title: string
  text: string
}

export const milestones: Milestone[] = [
  {
    icon: MessagesSquare,
    title: 'Comunicação em tempo real',
    text: 'Implementei sistemas de chat com WebSocket em duas plataformas distintas — hospitalar e turística — incluindo tratamento de desconexões e sincronização de sessão.',
  },
  {
    icon: MapPinned,
    title: 'Geolocalização aplicada',
    text: 'Construí navegação passo-a-passo com voz, usando OpenStreetMap e Leaflet, para orientar turistas até pontos de interesse em Angola.',
  },
  {
    icon: Sparkles,
    title: 'IA aplicada a produto',
    text: 'Integrei a API do Google Gemini para criar o "Kamba", um chatbot guia turístico, após avaliar alternativas como Groq e Cohere.',
  },
  {
    icon: Landmark,
    title: 'Software para o setor público',
    text: 'Desenvolvi e redesenhei interfaces de plataformas governamentais, com foco em confiança visual e acessibilidade para o cidadão comum.',
  },
]

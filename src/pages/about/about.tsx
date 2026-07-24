import Reveal, { RevealZoom } from '@/components/common/Reveal'
import { skillGroups } from '@/data/skills'
import { motion } from 'framer-motion'
import {

  Briefcase,

  Heart,
  Target,
  Sparkles,
  Award,
  Clock,
  MapPin,
  Code2,

  Server,
  Layers,

  BookOpen,
  Lightbulb,
  Users,
  Globe,
  Rocket,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import { useState, useEffect } from 'react'

// Dados adicionais - você pode mover para um arquivo separado
const journeyStats = [
  { label: 'Projetos Entregues', value: '15+', icon: Rocket },
  { label: 'Setores Atendidos', value: '4', icon: Target },
  { label: 'Tecnologias', value: '15+', icon: Code2 },
  { label: 'Horas de Código', value: '2000+', icon: Clock },
]

const values = [
  {
    icon: Lightbulb,
    title: 'Inovação',
    description: 'Busco sempre as melhores soluções, combinando criatividade com tecnologia.'
  },
  {
    icon: Users,
    title: 'Colaboração',
    description: 'Acredito no poder do trabalho em equipe para criar resultados extraordinários.'
  },
  {
    icon: Target,
    title: 'Compromisso',
    description: 'Entrego soluções que resolvem problemas reais e geram impacto positivo.'
  },
  {
    icon: Heart,
    title: 'Paixão',
    description: 'Amo o que faço e isso se reflete na qualidade do meu trabalho.'
  }
]

const achievements = [
  { year: '2024', title: 'Desenvolvimento de Plataforma de Turismo com IA', description: 'Integração de inteligência artificial para recomendações personalizadas' },
  { year: '2023', title: 'Sistema de Gestão Educacional', description: 'Plataforma para municípios com gestão de alunos e professores' },
  { year: '2023', title: 'Plataforma Governamental', description: 'Sistema de admissão ao ensino técnico-profissional' },
]

const techInterests = [
  { name: 'Inteligência Artificial', icon: Sparkles, color: '#8B5CF6' },
  { name: 'Arquitetura de Software', icon: Layers, color: '#EC4899' },
  { name: 'DevOps & Cloud', icon: Server, color: '#06B6D4' },
  { name: 'UX/UI Design', icon: Globe, color: '#F59E0B' },
]

function About() {

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Animação de contagem
  const CountUp = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (isVisible) {
        const interval = setInterval(() => {
          setCount(prev => {
            if (prev >= target) {
              clearInterval(interval)
              return target
            }
            return prev + 1
          })
        }, 30)
        return () => clearInterval(interval)
      }
    }, [ target])

    return <span>{count}{suffix}</span>
  }

  return (
    <section className="min-h-screen">
      {/* Hero da página Sobre */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo da esquerda */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                    Sobre Mim
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Luanda, Angola
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  <span className="gradient-text">1 ano</span> de estrada,
                  <br />
                  <span className="text-muted-foreground text-2xl sm:text-3xl lg:text-4xl">
                    quatro setores diferentes
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  Há cerca de um ano dedico-me ao desenvolvimento web full-stack em Angola.
                  Nesse tempo, em vez de ficar num único domínio, escolhi construir para
                  contextos bem diferentes entre si: um sistema de gestão educacional para
                  municípios, uma plataforma de turismo com IA e mapas, um serviço de consulta
                  hospitalar e uma plataforma governamental de admissão ao ensino técnico-profissional.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Gosto de entender o problema real antes de escrever código — e de deixar a
                  solução pronta para crescer, não apenas para funcionar hoje.
                </p>
              </Reveal>

              <Reveal delay={300} className="mt-6">
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#skills"
                    className="btn-primary"
                  >
                    <Code2 size={18} />
                    Ver Skills
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#journey"
                    className="btn-secondary"
                  >
                    <Briefcase size={18} />
                    Minha Jornada
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Lado direito - Stats e Badges */}
            <RevealZoom delay={200} className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <div className="grid grid-cols-2 gap-4">
                  {journeyStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card/50 border border-border/50 rounded-xl p-4 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                    >
                      <div className="flex justify-center mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        <CountUp target={parseInt(stat.value)} suffix={stat.value.replace(/[0-9+]/g, '')} />
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Badge de disponibilidade */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">Disponível para novos projetos</span>
                  </div>
                </motion.div>
              </div>
            </RevealZoom>
          </div>
        </div>
      </div>

      {/* Valores */}
      <div className="border-t border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                Meus Valores
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-4">
                O que me <span className="gradient-text">move</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Reveal key={index} delay={index * 100}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border/50 rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              Skills Técnicas
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Ferramentas do <span className="gradient-text">dia-a-dia</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Stack moderna para desenvolvimento full-stack
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 100}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <group.icon size={22} className="text-primary" strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-3 text-base font-semibold text-foreground">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Interesses Tecnológicos */}
      <div className="bg-card/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                Interesses
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-4">
                Tecnologias que <span className="gradient-text">estou explorando</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techInterests.map((tech, index) => (
              <Reveal key={index} delay={index * 100}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card border border-border/50 rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full" style={{ backgroundColor: `${tech.color}20` }}>
                      <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
                    </div>
                  </div>
                  <h3 className="font-medium text-foreground">{tech.name}</h3>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              Conquistas
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Marcos da <span className="gradient-text">minha jornada</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Linha do tempo simplificada */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 -translate-x-1/2" />

          {achievements.map((item, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className={`relative flex flex-col md:flex-row gap-6 mb-8 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-card transform -translate-x-1/2 z-10">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                </div>

                <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {item.year}
                      </span>
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA - Vamos Trabalhar Juntos */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Reveal>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Vamos criar algo <span className="gradient-text">incrível</span> juntos?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Estou pronto para novos desafios e oportunidades. Vamos transformar suas ideias em realidade!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contacto"
                className="btn-primary"
              >
                <MessageCircle size={18} />
                Entre em Contato
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="btn-secondary"
              >
                <BookOpen size={18} />
                Ver Projetos
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About

import Reveal, { RevealZoom } from '@/components/common/Reveal'
import { skillGroups } from '@/data/skills'
import { motion } from 'framer-motion'
import {
  Heart,
  Target,
  Sparkles,
  Award,
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
} from 'lucide-react'
import { useEffect, useState } from 'react'
import skillsGroups from "@/hooks/useTranslatedSkillGroups"

// ============================================================
// TYPES
// ============================================================

interface CountUpProps {
  target: number
  suffix?: string
  duration?: number
}

// ============================================================
// COUNT UP COMPONENT
// ============================================================

const CountUp = ({
  target,
  suffix = '',
  duration = 1200,
}: CountUpProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out para uma animação mais natural
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      const currentValue = Math.floor(easedProgress * target)

      setCount(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [target, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ============================================================
// JOURNEY STATS
// ============================================================

const journeyStats = [
  {
    label: 'Projetos Entregues',
    value: 15,
    suffix: '+',
    icon: Rocket,
  },
  {
    label: 'Setores Atendidos',
    value: 4,
    suffix: '',
    icon: Target,
  },
  {
    label: 'Tecnologias',
    value: 15,
    suffix: '+',
    icon: Code2,
  },

]

// ============================================================
// VALUES
// ============================================================

const values = [
  {
    title: 'Aprendizado Contínuo',
    description:
      'Acredito que um bom desenvolvedor nunca para de aprender. Busco constantemente novas tecnologias, boas práticas e formas melhores de resolver problemas.',
    icon: BookOpen,
  },
  {
    title: 'Qualidade',
    description:
      'Não quero apenas fazer funcionar. Procuro construir soluções organizadas, escaláveis, acessíveis e fáceis de manter.',
    icon: Award,
  },
  {
    title: 'Inovação',
    description:
      'Gosto de transformar ideias em experiências digitais modernas, explorando novas tecnologias para criar soluções que realmente façam diferença.',
    icon: Lightbulb,
  },
  {
    title: 'Colaboração',
    description:
      'Acredito que os melhores produtos são construídos quando diferentes ideias e experiências trabalham juntas.',
    icon: Users,
  },
]

// ============================================================
// TECHNOLOGY INTERESTS
// ============================================================

const techInterests = [
  {
    name: 'Frontend',
    description:
      'Interfaces modernas, responsivas e acessíveis.',
    icon: Layers,
  },
  {
    name: 'Backend',
    description:
      'APIs robustas, seguras e escaláveis.',
    icon: Server,
  },
  {
    name: 'Full Stack',
    description:
      'Integração completa entre frontend e backend.',
    icon: Code2,
  },
  {
    name: 'Arquitetura',
    description:
      'Estruturas organizadas e preparadas para crescimento.',
    icon: Globe,
  },
]

// ============================================================
// ACHIEVEMENTS
// ============================================================

const achievements = [
  'Desenvolvimento de aplicações web completas',
  'Criação de APIs REST e sistemas backend',
  'Integração de bancos de dados relacionais',
  'Desenvolvimento de interfaces responsivas',
  'Implementação de autenticação e autorização',
  'Integração com serviços externos',
]

const skillGroupsTranslated = skillsGroups()

// ============================================================
// ABOUT PAGE
// ============================================================

function About() {
  return (
    <section className="min-h-screen overflow-hidden">

      {/* ======================================================
          HERO
      ====================================================== */}

      <div className="relative">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-primary/5 blur-3xl" />

          <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ==================================================
                HERO CONTENT
            ================================================== */}

            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" />

                  Sobre mim
                </span>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-5 mb-6">
                  Mais do que código,
                  <br />

                  <span className="gradient-text">
                    construo soluções.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Sou desenvolvedor Full Stack apaixonado por tecnologia,
                  resolução de problemas e criação de experiências digitais
                  que realmente fazem a diferença.
                </p>
              </Reveal>
            </div>

            {/* ==================================================
                HERO VISUAL
            ================================================== */}

            <RevealZoom
              delay={200}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">

                <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />

                <div className="absolute inset-8 rounded-full border border-primary/10" />

                <div className="absolute inset-16 rounded-full border border-primary/10" />

                <div className="relative w-full h-full rounded-full bg-card/50 border border-border/50 flex items-center justify-center shadow-2xl">

                  <div className="text-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <Code2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
                    </div>

                    <p className="font-semibold">
                      Full Stack Developer
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Criando soluções digitais
                    </p>
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-4 right-0 bg-card/90 backdrop-blur-md border border-border rounded-xl px-3 py-2 shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" />

                      <span className="font-medium">
                        Criatividade
                      </span>
                    </div>
                  </motion.div>

                  {/* Floating badge */}
                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: 0.5,
                      ease: 'easeInOut',
                    }}
                    className="absolute bottom-4 left-0 bg-card/90 backdrop-blur-md border border-border rounded-xl px-3 py-2 shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Heart className="w-3.5 h-3.5 text-red-500" />

                      <span className="font-medium">
                        Paixão por tecnologia
                      </span>
                    </div>
                  </motion.div>

                </div>
              </div>
            </RevealZoom>
          </div>
        </div>
      </div>

      {/* ======================================================
          JOURNEY STATS
      ====================================================== */}

      <div className="border-y border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

            {journeyStats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 100}
              >
                <div className="group h-full text-center p-5 rounded-2xl bg-card/60 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">

                  <div className="flex justify-center mb-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="text-2xl sm:text-3xl font-bold">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>

                </div>
              </Reveal>
            ))}

          </div>
        </div>
      </div>

      {/* ======================================================
          MY STORY
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <Reveal>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                Minha história
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold mt-5 mb-6">
                Uma jornada de{' '}
                <span className="gradient-text">
                  aprendizado
                </span>
              </h2>

              <div className="space-y-5 text-muted-foreground leading-relaxed">

                <p>
                  Minha jornada na programação começou com a curiosidade
                  de entender como as aplicações que usamos diariamente
                  realmente funcionam.
                </p>

                <p>
                  Com o tempo, essa curiosidade transformou-se em paixão.
                  Passei a estudar diferentes tecnologias, construir
                  projetos e procurar constantemente formas melhores de
                  resolver problemas.
                </p>

                <p>
                  Hoje trabalho principalmente com desenvolvimento Full
                  Stack, buscando unir uma boa experiência de utilizador
                  com código organizado, seguro e escalável.
                </p>

              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Target className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    O meu objetivo
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Crescer enquanto desenvolvedor
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Quero continuar evoluindo tecnicamente, trabalhar em
                projetos desafiadores e contribuir para produtos que
                tenham impacto real.
              </p>

              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />

                    <span className="text-sm text-muted-foreground">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </Reveal>

        </div>
      </div>

      {/* ======================================================
          VALUES
      ====================================================== */}

      <div className="bg-card/30 border-y border-border/50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

          <Reveal>
            <div className="text-center mb-12">

              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                Princípios
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold mt-5">
                O que guia o meu{' '}
                <span className="gradient-text">
                  trabalho
                </span>
              </h2>

              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Mais do que tecnologias, acredito que bons resultados
                dependem dos princípios utilizados durante todo o processo.
              </p>

            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {values.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 100}
              >
                <div className="group h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">

                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>

                  <h3 className="font-semibold text-lg mb-3">
                    {value.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>

                </div>
              </Reveal>
            ))}

          </div>
        </div>
      </div>

      {/* ======================================================
          TECHNOLOGY INTERESTS
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

        <Reveal>
          <div className="text-center mb-12">

            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              Especialidades
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-5">
              Onde concentro a minha{' '}
              <span className="gradient-text">
                energia
              </span>
            </h2>

          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {techInterests.map((interest, index) => (
            <Reveal
              key={interest.name}
              delay={index * 100}
            >
              <div className="group h-full p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-300">

                <div className="flex items-center justify-between mb-5">

                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <interest.icon className="w-5 h-5 text-primary" />
                  </div>

                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />

                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {interest.name}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {interest.description}
                </p>

              </div>
            </Reveal>
          ))}

        </div>
      </div>

      {/* ======================================================
          SKILLS
      ====================================================== */}

      <div className="bg-card/30 border-y border-border/50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

          <Reveal>
            <div className="text-center mb-12">

              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                Stack
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold mt-5">
                Tecnologias que fazem parte da minha{' '}
                <span className="gradient-text">
                  jornada
                </span>
              </h2>

            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">

            {skillGroups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index * 100}
              >
                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {group.title}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        Tecnologias e ferramentas
                      </p>
                    </div>

                  </div>



                </div>
              </Reveal>
            ))}

          </div>

        </div>
      </div>

      {/* ======================================================
          LOCATION / AVAILABILITY
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

        <Reveal>
          <div className="rounded-3xl border border-border/50 bg-card/50 p-8 sm:p-10 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">

              <div>

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Localização
                    </p>

                    <h3 className="font-semibold">
                      Angola
                    </h3>
                  </div>

                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Aberto a novas{' '}
                  <span className="gradient-text">
                    oportunidades
                  </span>
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Estou disponível para projetos freelance,
                  oportunidades profissionais e colaborações
                  interessantes, tanto remotamente como presencialmente.
                </p>

              </div>

              <div className="md:justify-self-end">

                <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/50">

                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500" />

                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-50" />
                  </div>

                  <div>
                    <p className="font-medium text-sm">
                      Disponível para projetos
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Entre em contacto comigo
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  )
}

export default About

import {
  Mail,
  Award,
  Briefcase,
  Code2,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  Download,
  Calendar,
  MessageCircle,
  Palette,
} from 'lucide-react'
import Reveal, { RevealZoom } from '@/components/common/Reveal'
import ArchitecturePulse from '@/components/common/ArchitecturePulse'
import { profile } from '@/data/profile'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import profile1 from "../../assets/picture/profile1.jpeg"

// ============================================================
// TYPES
// ============================================================

interface CountUpProps {
  target: number
  suffix?: string
  duration?: number
}

// ============================================================
// COMPONENTS
// ============================================================

/**
 * Animated counter component.
 *
 * Uses requestAnimationFrame instead of setInterval
 * for smoother browser-synchronized animations.
 */
const CountUp = ({
  target,
  suffix = '',
  duration = 1000,
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

      const currentValue = Math.floor(progress * target)

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
      {count}
      {suffix}
    </span>
  )
}

// ============================================================
// DATA
// ============================================================

const stats = [
  {
    label: 'Projetos Entregues',
    value: 15,
    suffix: '+',
    icon: Code2,
  },
  {
    label: 'Clientes Satisfeitos',
    value: 10,
    suffix: '+',
    icon: Users,
  },
  {
    label: 'Anos de Experiência',
    value: 2,
    suffix: '+',
    icon: Briefcase,
  },
  {
    label: 'Tecnologias',
    value: 15,
    suffix: '+',
    icon: Award,
  },
]

const skills = [
  {
    name: 'React & Next.js',
    level: 90,
    color: '#61DAFB',
  },
  {
    name: 'TypeScript',
    level: 85,
    color: '#3178C6',
  },
  {
    name: 'Node.js',
    level: 88,
    color: '#339933',
  },
  {
    name: 'Tailwind CSS',
    level: 90,
    color: '#06B6D4',
  },
  {
    name: 'Laravel',
    level: 75,
    color: '#FF2D20',
  },
  {
    name: 'MySQL & Prisma',
    level: 80,
    color: '#4479A1',
  },
]

const experiences = [
  {
    title: 'Desenvolvedor Full Stack',
    period: '2024-2025',
    description:
      'Desenvolvimento de aplicações web completas, desde o design até a implantação em produção.',
    achievements: [
      'Criação de plataformas para turismo',
      'Implementação de sistemas em tempo real com WebSocket',
      'Otimização de performance e SEO',
    ],
  },
  {
    title: 'Desenvolvedor Frontend',
    company: 'Sosoft',
    period: '2025 - 2026',
    description:
      'Desenvolvimento de interfaces modernas e responsivas com React e TypeScript.',
    achievements: [
      'Participação na criação do Sistema Integrado Provincial da Educação',
      'Contribuição na Plataforma de Acesso ao Ensino Tecnico Profissional',
      'Contribuição na Plataforma de Gestão Academica do Instituto Polictenico Industrial de Luanda',
    ],
  },
]

// ============================================================
// HOME PAGE
// ============================================================

function Home() {
  return (
    <section className="min-h-screen">
      {/* ======================================================
          HERO SECTION
      ====================================================== */}

      <div className="relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />

          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* ==================================================
                CONTEÚDO DA ESQUERDA
            ================================================== */}

            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />

                    Disponível para projetos
                  </span>

                  <span className="text-xs text-muted-foreground">
                    •
                  </span>

                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />

                    {new Date().getFullYear()}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Olá, sou{' '}
                  <span className="gradient-text">
                    {profile.name}
                  </span>

                  <br />

                  <span className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground">
                    Full Stack Developer
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  {profile.description ||
                    'Transformo ideias em experiências digitais incríveis, com foco em soluções inovadoras e de alta qualidade.'}
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-3 mb-8">
                  {/* Contact */}
                  <a
                    href={`mailto:${profile.email}`}
                    className="btn-primary"
                  >
                    <Mail size={18} />

                    Vamos Conversar

                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Projects */}
                  <a
                    href="#projetos"
                    className="btn-secondary"
                  >
                    <Code2 size={18} />

                    Ver Projetos
                  </a>

                  {/* CV */}
                  <a
                    href="/curriculo.pdf"
                    download
                    className="btn-secondary"
                  >
                    <Download size={18} />

                    Currículo
                  </a>
                </div>
              </Reveal>

              {/* ==================================================
                  SOCIAL LINKS
              ================================================== */}

              <Reveal delay={400}>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Conecte-se:
                  </span>

                  <div className="flex gap-2">
                    {[
                      {
                        icon: FaGithub,
                        url: profile.github,
                        label: 'GitHub',
                      },
                      {
                        icon: FaLinkedin,
                        url: profile.linkedin,
                        label: 'LinkedIn',
                      },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-muted/30 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ==================================================
                LADO DIREITO - AVATAR
            ================================================== */}



            <RevealZoom delay={200} className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-70 sm:max-w-sm lg:max-w-md aspect-square mx-auto lg:mx-0">

                {/* Camada 1 - Glow de fundo com gradiente mais suave */}
                <div className="absolute -inset-12 sm:-inset-16 bg-linear-to-br from-primary/5 via-primary/10 to-transparent rounded-full blur-3xl" />

                {/* Camada 2 - Glow médio com movimento sutil */}
                <motion.div
                  className="absolute -inset-6 sm:-inset-8 bg-linear-to-tr from-primary/20 via-primary/5 to-transparent rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Camada 3 - Padrão de pontos refinado */}
                <div
                  className="absolute -inset-8 sm:-inset-12 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `
              radial-gradient(circle at 20% 50%, var(--color-primary) 1px, transparent 1px),
              radial-gradient(circle at 80% 50%, var(--color-primary) 1px, transparent 1px)
            `,
                    backgroundSize: "40px 40px, 40px 40px",
                    backgroundPosition: "0 0, 20px 20px",
                    maskImage: "radial-gradient(circle at center, black 30%, transparent 65%)",
                    WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 65%)",
                  }}
                />

                {/* Sombra de "chão" aprimorada */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[75%] h-8 bg-black/15 dark:bg-black/30 rounded-full blur-2xl" />

                {/* Container da imagem com morphing refinado */}
                <motion.div
                  className="relative w-full h-full overflow-hidden shadow-2xl ring-1 ring-primary/5"
                  animate={{
                    borderRadius: [
                      "60% 40% 50% 50% / 50% 45% 55% 50%",
                      "45% 55% 55% 45% / 50% 55% 45% 50%",
                      "55% 45% 45% 55% / 40% 55% 45% 60%",
                      "60% 40% 50% 50% / 50% 45% 55% 50%",
                    ],
                  }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src={profile1}
                    alt="Foto de Erivaldo Manuel"
                    className="w-full h-full object-cover grayscale-15 contrast-[1.05]"
                  />

                  {/* Overlay com gradiente e blending sutil */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/15 via-primary/5 to-transparent mix-blend-overlay pointer-events-none" />

                  {/* Overlay de borda suave */}
                  <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/5 pointer-events-none" />
                </motion.div>

                {/* Badge principal - React com animação mais refinada */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-[6%] -right-1 sm:-right-3 bg-background/80 backdrop-blur-sm border border-primary/10 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg shadow-primary/5"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span className="text-foreground/80">React</span>
                    <span className="hidden sm:inline text-muted-foreground/50">·</span>
                    <span className="hidden sm:inline text-muted-foreground/70 text-[10px]">19.0</span>
                  </div>
                </motion.div>

                {/* Badge secundário - TypeScript com delay diferente */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute bottom-[8%] -left-1 sm:-left-3 bg-background/80 backdrop-blur-sm border border-primary/10 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg shadow-primary/5"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                    <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-foreground/80">TypeScript</span>
                    <span className="hidden sm:inline text-muted-foreground/50">·</span>
                    <span className="hidden sm:inline text-muted-foreground/70 text-[10px]">5.0</span>
                  </div>
                </motion.div>

                {/* Badge opcional - Framework/Stack */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                  className="absolute top-[15%] -left-1 sm:-left-2 bg-background/60 backdrop-blur-sm border border-primary/5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm"
                >
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-muted-foreground">
                    <Code2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>Next.js</span>
                  </div>
                </motion.div>

                {/* Badge de design system */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  className="absolute bottom-[22%] -right-1 sm:-right-2 bg-background/60 backdrop-blur-sm border border-primary/5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm"
                >
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-muted-foreground">
                    <Palette className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>Tailwind</span>
                  </div>
                </motion.div>

                {/* Nome e cargo sobrepostos (opcional) */}

              </div>
            </RevealZoom>
          </div>
        </div>
      </div>

      {/* ======================================================
          STATS SECTION
      ====================================================== */}

      <div className="border-t border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 100}
              >
                <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  {/* Icon */}
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Animated number */}
                  <div className="text-2xl font-bold text-foreground">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================
          SKILLS SECTION
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              Especialidades
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Stack de{' '}
              <span className="gradient-text">
                Tecnologias
              </span>
            </h2>

            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Stack moderna para criar aplicações escaláveis e de alta performance
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <Reveal
              key={skill.name}
              delay={index * 100}
            >
              <div className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">
                    {skill.name}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${skill.level}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      ease: 'easeOut',
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: skill.color,
                    }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ======================================================
          ARCHITECTURE SECTION
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <Reveal>
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              Arquitetura
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold mt-4">
              Como{' '}
              <span className="gradient-text">
                construo
              </span>{' '}
              soluções
            </h2>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-2xl border border-border bg-card/50 p-4 sm:p-6 shadow-sm">
            <ArchitecturePulse />
          </div>
        </Reveal>
      </div>

      {/* ======================================================
          EXPERIENCE SECTION
      ====================================================== */}

      <div className="bg-card/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                Experiência
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold mt-4">
                Trajetória{' '}
                <span className="gradient-text">
                  profissional
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-linear-to-b from-primary/20 via-primary/40 to-primary/20 -translate-x-1/2" />

            {experiences.map((exp, index) => (
              <Reveal
                key={`${exp.company}-${exp.title}`}
                delay={index * 150}
              >
                <div
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0
                    ? 'md:pr-12'
                    : 'md:pl-12 md:flex-row-reverse'
                    }`}
                >
                  {/* Timeline marker */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-card transform -translate-x-1/2 z-10">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  </div>

                  <div
                    className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0
                      ? 'md:text-right'
                      : ''
                      }`}
                  >
                    <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                      {/* Job title */}
                      <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="w-5 h-5 text-primary" />

                        <div>
                          <h3 className="font-semibold text-lg">
                            {exp.title}
                          </h3>

                          <p className="text-sm text-primary">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Period */}
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />

                        {exp.period}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-3">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-1.5">
                        {exp.achievements.map(
                          (item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />

                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================
          CTA SECTION
      ====================================================== */}

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Reveal>
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Vamos construir algo{' '}
              <span className="gradient-text">
                incrível
              </span>{' '}
              juntos?
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Estou sempre aberto a novos desafios e oportunidades. Entre em contato e vamos conversar!
            </p>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary"
              >
                <Mail size={18} />

                Iniciar Conversa
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Home

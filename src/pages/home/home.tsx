import { Mail, Phone, Award, Briefcase, Code2, Users, Sparkles, ArrowRight, CheckCircle, Clock, Star, Zap, Download, Calendar, MessageCircle } from 'lucide-react'
import Reveal, {  RevealZoom } from '@/components/common/Reveal'
import ArchitecturePulse from '@/components/common/ArchitecturePulse'
import { profile } from '@/data/profile'
import { FaGithub, FaLinkedin} from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Dados de exemplo - você pode mover para um arquivo separado
const stats = [
  { label: 'Projetos Entregues', value: '15+', icon: Code2 },
  { label: 'Clientes Satisfeitos', value: '10+', icon: Users },
  { label: 'Anos de Experiência', value: '2+', icon: Briefcase },
  { label: 'Tecnologias', value: '15+', icon: Award },
]

const skills = [
  { name: 'React & Next.js', level: 90, color: '#61DAFB' },
  { name: 'TypeScript', level: 85, color: '#3178C6' },
  { name: 'Node.js', level: 80, color: '#339933' },
  { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
  { name: 'Laravel', level: 75, color: '#FF2D20' },
  { name: 'MySQL & Prisma', level: 80, color: '#4479A1' },
]

const experiences = [
  {
    title: 'Desenvolvedor Full Stack',
    company: 'Freelancer',
    period: '2023 - Presente',
    description: 'Desenvolvimento de aplicações web completas, desde o design até a implantação em produção.',
    achievements: [
      'Criação de plataformas para turismo, saúde e educação',
      'Implementação de sistemas em tempo real com WebSocket',
      'Otimização de performance e SEO'
    ]
  },
  {
    title: 'Desenvolvedor Frontend',
    company: 'Projetos Pessoais',
    period: '2022 - 2023',
    description: 'Desenvolvimento de interfaces modernas e responsivas com React e TypeScript.',
    achievements: [
      'Criação de 10+ projetos open source',
      'Contribuição em comunidades de desenvolvimento',
      'Aprendizado contínuo de novas tecnologias'
    ]
  }
]

const testimonials = [
  {
    name: 'Cliente Anônimo',
    role: 'CEO de Startup',
    text: 'Trabalho excepcional! Entregou um produto incrível que superou minhas expectativas.',
    rating: 5
  },
  {
    name: 'Cliente Anônimo',
    role: 'Gestor de Projeto',
    text: 'Profissional dedicado e muito criativo. Recomendo fortemente!',
    rating: 5
  }
]

function Home() {
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
      {/* Hero Section - Melhorada */}
      <div className="relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo da esquerda */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Disponível para projetos
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date().getFullYear()}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Olá, sou{' '}
                  <span className="gradient-text">{profile.name}</span>
                  <br />
                  <span className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground">
                    Full Stack Developer
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  {profile.description || 'Transformo ideias em experiências digitais incríveis, com foco em soluções inovadoras e de alta qualidade.'}
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-3 mb-8">
                  <a
                    href={`mailto:${profile.email}`}
                    className="btn-primary"
                  >
                    <Mail size={18} />
                    Vamos Conversar
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#projetos"
                    className="btn-secondary"
                  >
                    <Code2 size={18} />
                    Ver Projetos
                  </a>

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

              {/* Social Links */}
              <Reveal delay={400}>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Conecte-se:</span>
                  <div className="flex gap-2">
                    {[
                      { icon: FaGithub, url: profile.github, label: 'GitHub' },
                      { icon: FaLinkedin, url: profile.linkedin, label: 'LinkedIn' },

                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
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

            {/* Lado direito - Avatar/Ilustração */}
            <RevealZoom delay={200} className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  {/* Avatar Placeholder - Substitua pela sua imagem */}
                  <div className="w-full h-full rounded-full bg-linear-to-br from-primary/20 to-primary/5 border-2 border-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl sm:text-7xl mb-2">👨‍💻</div>
                      <p className="text-sm text-muted-foreground">Desenvolvedor</p>
                    </div>
                  </div>

                  {/* Badges flutuantes */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-3 py-2 shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      <span className="font-medium">React</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-3 py-2 shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="font-medium">TypeScript</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </RevealZoom>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    <CountUp target={parseInt(stat.value)} suffix={stat.value.replace(/[0-9+]/g, '')} />
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              Especialidades
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Tecnologias que <span className="gradient-text">domino</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Stack moderna para criar aplicações escaláveis e de alta performance
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: skill.color }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Architecture Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <Reveal>
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              Arquitetura
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-4">
              Como <span className="gradient-text">construo</span> soluções
            </h2>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-2xl border border-border bg-card/50 p-4 sm:p-6 shadow-sm">
            <ArchitecturePulse />
          </div>
        </Reveal>
      </div>

      {/* Experience Section */}
      <div className="bg-card/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                Experiência
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-4">
                Trajetória <span className="gradient-text">profissional</span>
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* Linha do tempo */}
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-linear-to-b from-primary/20 via-primary/40 to-primary/20 -translate-x-1/2" />

            {experiences.map((exp, index) => (
              <Reveal key={index} delay={index * 150}>
                <div className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:flex-row-reverse'}`}>
                  {/* Marcador da linha do tempo */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-card transform -translate-x-1/2 z-10">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  </div>

                  <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                      <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <div>
                          <h3 className="font-semibold text-lg">{exp.title}</h3>
                          <p className="text-sm text-primary">{exp.company}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
              Depoimentos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              O que dizem <span className="gradient-text">sobre mim</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className="bg-card/50 border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Reveal>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Vamos construir algo <span className="gradient-text">incrível</span> juntos?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Estou sempre aberto a novos desafios e oportunidades. Entre em contato e vamos conversar!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary"
              >
                <Mail size={18} />
                Iniciar Conversa
              </a>
              <a
                href="#contacto"
                className="btn-secondary"
              >
                <Phone size={18} />
                Agendar Chamada
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Home
